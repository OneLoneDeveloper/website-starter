import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { chargePayment } from "../src/features/payments/paymentsController.js";

describe("paymentsController", () => {
  test("charges a payment and sends success text", async () => {
    let chargeInput;
    let responseText;

    const response = {
      send(text) {
        responseText = text;
      },
    };

    await chargePayment(
      {
        body: { amount: "25.00", cloverToken: "token-123" },
        ip: "127.0.0.1",
      },
      response,
      () => {},
      async (input) => {
        chargeInput = input;
        return { id: "charge-123" };
      },
    );

    assert.deepEqual(chargeInput, {
      amount: "25.00",
      token: "token-123",
      clientIp: "127.0.0.1",
    });
    assert.equal(responseText, "Payment successful!");
  });

  test("forwards payment errors to middleware", async () => {
    const paymentError = new Error("Card declined");
    let forwardedError;

    await chargePayment(
      { body: {}, ip: "127.0.0.1" },
      {},
      (error) => {
        forwardedError = error;
      },
      async () => {
        throw paymentError;
      },
    );

    assert.equal(forwardedError, paymentError);
  });
});
