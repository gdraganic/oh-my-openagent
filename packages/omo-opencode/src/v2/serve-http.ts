import { getServerBasicAuthHeader } from "../shared/opencode-server-auth"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { getOpenCodeConfigDir } from "../shared/opencode-config-dir"
import { spawn } from "../shared/bun-spawn-shim"

export type SessionPage = {
  data: Array<Record<string, unknown>>
  cursor?: { next?: string | null }
}

export class SessionHttpError extends Error {
  constructor(readonly status: number) {
    super(status === 401 ? "OpenCode session list unauthorized" : `OpenCode session request failed (${status})`)
    this.name = "SessionHttpError"
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function argValue(argv: readonly string[], name: string): string | undefined {
  const index = argv.indexOf(name)
  if (index >= 0 && typeof argv[index + 1] === "string") return argv[index + 1]
  const prefixed = argv.find((arg) => arg.startsWith(`${name}=`))
  return prefixed?.slice(name.length + 1)
}

export async function resolveServeOrigin(input: {
  argv: readonly string[]
  listenPort: () => Promise<number | undefined>
}): Promise<string | undefined> {
  const hostname = argValue(input.argv, "--hostname") || "127.0.0.1"
  const rawPort = argValue(input.argv, "--port")
  const parsed = rawPort === undefined ? undefined : Number(rawPort)
  const port = parsed === undefined || parsed === 0 || Number.isNaN(parsed)
    ? await input.listenPort()
    : parsed
  if (!port) return undefined
  return `http://${hostname}:${port}`
}

export async function listenPortOf(pid = process.pid): Promise<number | undefined> {
  const proc = spawn(["lsof", "-a", "-nP", "-p", String(pid), "-iTCP", "-sTCP:LISTEN"], {
    stdout: "pipe",
    stderr: "ignore",
  })
  const text = await new Response(proc.stdout).text()
  const match = text.match(/:(\d+)\s+\(LISTEN\)/)
  return match ? Number(match[1]) : undefined
}

// The background service (`opencode serve --service`) authenticates with the
// password in <config dir>/service.json; OPENCODE_SERVER_PASSWORD inherited from
// the launching client (OpenChamber) can be a different server's password.
// Try each candidate and keep the one the server accepts.
function basicAuth(password: string): string {
  const username = process.env.OPENCODE_SERVER_USERNAME ?? "opencode"
  return `Basic ${Buffer.from(`${username}:${password}`, "utf8").toString("base64")}`
}

function servicePassword(): string | undefined {
  try {
    const parsed: unknown = JSON.parse(readFileSync(join(getOpenCodeConfigDir({ binary: "opencode" }), "service.json"), "utf8"))
    return isRecord(parsed) && typeof parsed.password === "string" && parsed.password.length > 0 ? parsed.password : undefined
  } catch {
    return undefined
  }
}

export function serverAuthCandidates(): Array<string | undefined> {
  const candidates: Array<string | undefined> = []
  const fromEnv = getServerBasicAuthHeader()
  if (fromEnv) candidates.push(fromEnv)
  const fromService = servicePassword()
  if (fromService) {
    const header = basicAuth(fromService)
    if (!candidates.includes(header)) candidates.push(header)
  }
  if (candidates.length === 0) candidates.push(undefined)
  return candidates
}

let acceptedAuth: string | undefined

export function _resetServerAuthForTesting(): void {
  acceptedAuth = undefined
}

export async function serverFetch(url: string, init: RequestInit, fetchImpl: typeof fetch): Promise<Response> {
  const candidates = serverAuthCandidates()
  const ordered = acceptedAuth !== undefined && candidates.includes(acceptedAuth)
    ? [acceptedAuth, ...candidates.filter((candidate) => candidate !== acceptedAuth)]
    : candidates
  let response: Response | undefined
  for (const auth of ordered) {
    const headers = new Headers(init.headers)
    if (auth) headers.set("Authorization", auth)
    else headers.delete("Authorization")
    response = await fetchImpl(url, { ...init, headers })
    if (response.status !== 401) {
      acceptedAuth = auth
      return response
    }
  }
  return response as Response
}

async function getJson(url: string, fetchImpl: typeof fetch): Promise<unknown> {
  const response = await serverFetch(url, {}, fetchImpl)
  if (response.status === 401) throw new SessionHttpError(401)
  if (!response.ok) throw new SessionHttpError(response.status)
  return response.json()
}

// The plugin model registry omits service-tier models (-fast, -pro, -flex) that
// the server's HTTP model list and the session runner accept.
export async function listModels(origin: string, directory: string, fetchImpl: typeof fetch): Promise<Array<Record<string, unknown>>> {
  const response = await serverFetch(new URL("/api/model", origin).toString(), { headers: { "x-opencode-directory": directory } }, fetchImpl)
  if (response.status === 401) throw new SessionHttpError(401)
  if (!response.ok) throw new SessionHttpError(response.status)
  const body: unknown = await response.json()
  return isRecord(body) && Array.isArray(body.data) ? body.data.filter(isRecord) : []
}

export async function listSessions(origin: string, fetchImpl: typeof fetch): Promise<Array<Record<string, unknown>>> {
  const sessions: Array<Record<string, unknown>> = []
  let cursor: string | undefined
  for (;;) {
    const url = new URL("/api/session", origin)
    if (cursor) url.searchParams.set("cursor", cursor)
    const body = await getJson(url.toString(), fetchImpl)
    if (!isRecord(body) || !Array.isArray(body.data)) break
    sessions.push(...body.data.filter(isRecord))
    const next = isRecord(body.cursor) && typeof body.cursor.next === "string" ? body.cursor.next : undefined
    if (!next) break
    cursor = next
  }
  return sessions
}

export async function activeSessions(origin: string, fetchImpl: typeof fetch): Promise<Record<string, { type: string }>> {
  const body = await getJson(new URL("/api/session/active", origin).toString(), fetchImpl)
  const source = isRecord(body) && isRecord(body.data) ? body.data : isRecord(body) ? body : {}
  const status: Record<string, { type: string }> = {}
  for (const sessionID of Object.keys(source)) status[sessionID] = { type: "busy" }
  return status
}

const jsonHeaders = { "content-type": "application/json" }

const unwrap = (body: unknown): unknown => (isRecord(body) && "data" in body ? body.data : body)

/** A session record over HTTP; `metadata` is what OpenCode stored for it. */
export async function getSessionRecord(origin: string, sessionID: string, fetchImpl: typeof fetch): Promise<Record<string, unknown>> {
  const response = await serverFetch(`${origin}/api/session/${encodeURIComponent(sessionID)}`, { headers: jsonHeaders }, fetchImpl)
  if (!response.ok) throw new SessionHttpError(response.status)
  const session = unwrap(await response.json())
  return isRecord(session) ? session : {}
}

/**
 * Replaces a session's metadata. The plugin `session.update` accepts metadata
 * but OpenCode 2.0.x does not store it from there; this is the route
 * OpenChamber writes goal metadata through.
 */
export async function patchSessionMetadata(origin: string, sessionID: string, metadata: Record<string, unknown>, fetchImpl: typeof fetch): Promise<void> {
  const response = await serverFetch(`${origin}/api/session/${encodeURIComponent(sessionID)}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify({ metadata }),
  }, fetchImpl)
  if (!response.ok) throw new SessionHttpError(response.status)
}
