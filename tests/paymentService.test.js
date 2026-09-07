import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { createCharge } from "../src/services/paymentService.js";

describe("paymentService", () => {
  test("creates a Clover charge request", async () => {
    const originalFetch = globalThis.fetch;
    let requestUrl;
    let requestOptions;

    globalThis.fetch = async (url, options) => {
      requestUrl = url;
      requestOptions = options;

      return {
        ok: true,
        async json() {
          return { id: "charge-123", status: "succeeded" };
        },
      };
    };

    try {
      const result = await createCharge({
        amount: "12.50",
        token: "clover-token",
        clientIp: "127.0.0.1",
      });

      assert.equal(result.id, "charge-123");
      assert.equal(requestOptions.method, "POST");
      assert.equal(requestOptions.headers["x-forwarded-for"], "127.0.0.1");
      assert.deepEqual(JSON.parse(requestOptions.body), {
        amount: 1250,
        currency: "usd",
        source: "clover-token",
      });
      assert.equal(typeof requestUrl, "string");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("turns a failed Clover response into an error", async () => {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async () => ({
      ok: false,
      status: 402,
      async json() {
        return { message: "Card declined", code: "card_declined" };
      },
    });

    try {
      await assert.rejects(
        createCharge({ amount: 10, token: "clover-token", clientIp: "127.0.0.1" }),
        (error) => {
          assert.equal(error.message, "Card declined");
          assert.equal(error.statusCode, 402);
          assert.deepEqual(error.details, {
            message: "Card declined",
            code: "card_declined",
          });
          return true;
        },
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
