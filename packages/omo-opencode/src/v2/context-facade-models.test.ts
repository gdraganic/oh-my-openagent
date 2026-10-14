/// <reference path="../../../../bun-test.d.ts" />

import { describe, expect, test } from "bun:test"
import type { Plugin } from "@opencode/plugin"

import { createV1PluginInput } from "./context-facade"

function createModelContext(): Plugin.Context {
  return {
    location: { directory: "/tmp/project", project: { id: "proj", directory: "/tmp/project", canonical: "/tmp/project" } },
    session: {},
    provider: { list: async () => ({ data: [{ id: "openai", activation: "enabled" }, { id: "anthropic", activation: "enabled" }] }) },
    model: {
      list: async () => ({
        data: [
          { providerID: "openai", id: "gpt-5.6-luna" },
          { providerID: "anthropic", id: "claude-haiku-4-5" },
        ],
      }),
    },
  } as unknown as Plugin.Context
}

function providerModels(result: { data: unknown }, providerID: string): string[] {
  const data = result.data as { all: Array<{ id: string; models: Record<string, unknown> }> }
  return Object.keys(data.all.find((provider) => provider.id === providerID)?.models ?? {}).sort()
}

describe("V2 context facade provider list", () => {
  test("#given the server lists service-tier models the plugin registry omits #when providers are listed #then the tier models are included", async () => {
    // given
    const requests: Array<{ url: string; directory: string | null }> = []
    const fetchImpl = (async (url: string, init?: RequestInit) => {
      requests.push({ url, directory: new Headers(init?.headers).get("x-opencode-directory") })
      return new Response(JSON.stringify({
        data: [
          { providerID: "openai", id: "gpt-5.6-luna" },
          { providerID: "openai", id: "gpt-5.6-luna-fast" },
          { providerID: "anthropic", id: "claude-opus-5-5-fast" },
        ],
      }))
    }) as typeof fetch
    const v1 = createV1PluginInput(createModelContext(), { fetchImpl, argv: ["serve", "--port", "4096"] })

    // when
    const result = await (v1.client as unknown as { provider: { list: () => Promise<{ data: unknown }> } }).provider.list()

    // then
    expect(providerModels(result, "openai")).toEqual(["gpt-5.6-luna", "gpt-5.6-luna-fast"])
    expect(providerModels(result, "anthropic")).toEqual(["claude-haiku-4-5", "claude-opus-5-5-fast"])
    expect(requests).toEqual([{ url: "http://127.0.0.1:4096/api/model", directory: "/tmp/project" }])
  })

  test("#given the server model list is unreachable #when providers are listed #then the plugin registry is used alone", async () => {
    // given
    const fetchImpl = (async () => new Response("down", { status: 503 })) as unknown as typeof fetch
    const v1 = createV1PluginInput(createModelContext(), { fetchImpl, argv: ["serve", "--port", "4096"] })

    // when
    const result = await (v1.client as unknown as { provider: { list: () => Promise<{ data: unknown }> } }).provider.list()

    // then
    expect(providerModels(result, "openai")).toEqual(["gpt-5.6-luna"])
  })
})
