/// <reference path="../../../../bun-test.d.ts" />

import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { _resetServerAuthForTesting, listModels, serverFetch } from "./serve-http"

function basic(password: string): string {
  return `Basic ${Buffer.from(`opencode:${password}`, "utf8").toString("base64")}`
}

describe("V2 server HTTP authentication", () => {
  let configDir: string
  const saved = { password: process.env.OPENCODE_SERVER_PASSWORD, configDir: process.env.OPENCODE_CONFIG_DIR }

  beforeEach(() => {
    configDir = mkdtempSync(join(tmpdir(), "omo-v2-auth-"))
    process.env.OPENCODE_CONFIG_DIR = configDir
    _resetServerAuthForTesting()
  })

  afterEach(() => {
    rmSync(configDir, { recursive: true, force: true })
    if (saved.password === undefined) delete process.env.OPENCODE_SERVER_PASSWORD
    else process.env.OPENCODE_SERVER_PASSWORD = saved.password
    if (saved.configDir === undefined) delete process.env.OPENCODE_CONFIG_DIR
    else process.env.OPENCODE_CONFIG_DIR = saved.configDir
  })

  test("#given the inherited password belongs to another server #when the service password is in service.json #then the request retries with it and keeps it", async () => {
    // given
    process.env.OPENCODE_SERVER_PASSWORD = "inherited-from-client"
    writeFileSync(join(configDir, "service.json"), JSON.stringify({ password: "service-secret" }))
    const seen: Array<string | null> = []
    const fetchImpl = (async (_url: string, init?: RequestInit) => {
      const auth = new Headers(init?.headers).get("Authorization")
      seen.push(auth)
      if (auth !== basic("service-secret")) return new Response("no", { status: 401 })
      return new Response(JSON.stringify({ data: [{ providerID: "openai", id: "gpt-5.6-luna-fast" }] }))
    }) as typeof fetch

    // when
    const first = await listModels("http://127.0.0.1:4096", "/tmp/project", fetchImpl)
    const second = await serverFetch("http://127.0.0.1:4096/api/session", {}, fetchImpl)

    // then
    expect(first).toEqual([{ providerID: "openai", id: "gpt-5.6-luna-fast" }])
    expect(second.status).toBe(200)
    expect(seen).toEqual([basic("inherited-from-client"), basic("service-secret"), basic("service-secret")])
  })

  test("#given only the environment password #when it is accepted #then no service.json is needed", async () => {
    // given
    process.env.OPENCODE_SERVER_PASSWORD = "only-env"
    const seen: Array<string | null> = []
    const fetchImpl = (async (_url: string, init?: RequestInit) => {
      seen.push(new Headers(init?.headers).get("Authorization"))
      return new Response(JSON.stringify({ data: [] }))
    }) as typeof fetch

    // when
    await listModels("http://127.0.0.1:4096", "/tmp/project", fetchImpl)

    // then
    expect(seen).toEqual([basic("only-env")])
  })

  test("#given every password is rejected #when a request is made #then the 401 surfaces", async () => {
    // given
    process.env.OPENCODE_SERVER_PASSWORD = "wrong"
    writeFileSync(join(configDir, "service.json"), JSON.stringify({ password: "also-wrong" }))
    const fetchImpl = (async () => new Response("no", { status: 401 })) as unknown as typeof fetch

    // when / then
    await expect(listModels("http://127.0.0.1:4096", "/tmp/project", fetchImpl)).rejects.toMatchObject({ status: 401 })
  })
})
