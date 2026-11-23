/// <reference path="../../../../bun-test.d.ts" />

import { describe, expect, test } from "bun:test"

import { primeConnectedProvidersCache, refreshProviderCacheWhenServerReady } from "./host"

describe("V2 connected providers cache priming", () => {
  test("#given no cache #when the adapter starts #then it builds the cache before agents resolve", async () => {
    // given
    const calls: unknown[] = []
    const client = { provider: { list: async () => ({ data: { connected: [], all: [] } }) } }

    // when
    await primeConnectedProvidersCache(client, { hasCache: () => false, update: async (c) => { calls.push(c) } })

    // then
    expect(calls).toEqual([client])
  })

  test("#given a cache #when the adapter starts #then it does not wait on the provider list", async () => {
    // given
    let called = false

    // when
    await primeConnectedProvidersCache({}, { hasCache: () => true, update: async () => { called = true } })

    // then
    expect(called).toBe(false)
  })

  test("#given a provider list that hangs #when the timeout passes #then startup continues", async () => {
    // given
    const hang = () => new Promise<void>(() => {})

    // when
    const started = Date.now()
    await primeConnectedProvidersCache({}, { hasCache: () => false, update: hang, timeoutMs: 50 })

    // then
    expect(Date.now() - started).toBeLessThan(2000)
  })
})

describe("V2 provider cache refresh once the server answers", () => {
  test("#given the server answers 503 while plugins load #when it becomes ready #then the cache is rebuilt once", async () => {
    // given
    let calls = 0
    const updates: unknown[] = []
    const probe = async () => {
      calls += 1
      if (calls < 3) throw new Error("OpenCode session request failed (503)")
      return true
    }

    // when
    const refreshed = await refreshProviderCacheWhenServerReady({}, { probe, update: async (client) => { updates.push(client) }, sleep: async () => {} })

    // then
    expect(refreshed).toBe(true)
    expect(calls).toBe(3)
    expect(updates).toHaveLength(1)
  })

  test("#given a server that never answers #when the attempts run out #then nothing is rebuilt", async () => {
    // given
    let updated = false

    // when
    const refreshed = await refreshProviderCacheWhenServerReady({}, {
      probe: async () => false,
      update: async () => { updated = true },
      attempts: 4,
      sleep: async () => {},
    })

    // then
    expect(refreshed).toBe(false)
    expect(updated).toBe(false)
  })
})
