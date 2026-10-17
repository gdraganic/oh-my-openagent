/// <reference path="../../../../bun-test.d.ts" />

import { describe, expect, test } from "bun:test"

import { primeConnectedProvidersCache } from "./host"

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
