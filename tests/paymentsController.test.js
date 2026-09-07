import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  chargePayment,
  showCheckoutForm,
} from "../src/features/payments/paymentsController.js";

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
        body: { cloverToken: "token-123" },
        params: { productSlug: "coffee-mug" },
        ip: "127.0.0.1",
      },
      response,
      () => {},
      async (input) => {
        chargeInput = input;
        return { id: "charge-123" };
      },
      async (productSlug) => {
        assert.equal(productSlug, "coffee-mug");
        return { slug: "coffee-mug", price: 25, inStock: true };
      },
    );

    assert.deepEqual(chargeInput, {
      amount: 25,
      token: "token-123",
      clientIp: "127.0.0.1",
    });
    assert.equal(responseText, "Payment successful!");
  });

  test("forwards payment errors to middleware", async () => {
    const paymentError = new Error("Card declined");
    let forwardedError;

    await chargePayment(
      { body: {}, params: { productSlug: "coffee-mug" }, ip: "127.0.0.1" },
      {},
      (error) => {
        forwardedError = error;
      },
      async () => {
        throw paymentError;
      },
      async () => ({ slug: "coffee-mug", price: 25, inStock: true }),
    );

    assert.equal(forwardedError, paymentError);
  });

  test("renders checkout for an available product", async () => {
    let renderedView;
    let renderedData;

    const response = {
      status(code) {
        assert.equal(code, 200);
        return this;
      },
      render(view, data) {
        renderedView = view;
        renderedData = data;
      },
    };

    await showCheckoutForm(
      { params: { productSlug: "coffee-mug" } },
      response,
      () => {},
      async (productSlug) => {
        assert.equal(productSlug, "coffee-mug");
        return {
          slug: "coffee-mug",
          name: "Coffee Mug",
          price: 25,
          inStock: true,
        };
      },
    );

    assert.equal(renderedView, "pages/payments/checkout");
    assert.equal(renderedData.product.name, "Coffee Mug");
    assert.equal(renderedData.product.price, 25);
  });
});
