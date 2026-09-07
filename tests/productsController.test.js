import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { showProducts } from "../src/features/products/productsController.js";

describe("productsController", () => {
  test("renders products", async () => {
    const products = [{ name: "Coffee Mug" }];
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

    await showProducts({}, response, () => {}, async () => products);

    assert.equal(renderedView, "pages/products");
    assert.deepEqual(renderedData, {
      title: "Products",
      products,
    });
  });

  test("passes product lookup errors to middleware", async () => {
    const databaseError = new Error("Database unavailable");
    let forwardedError;

    const response = {
      status() {
        throw new Error("The response should not be rendered");
      },
    };

    await showProducts(
      {},
      response,
      (error) => {
        forwardedError = error;
      },
      async () => {
        throw databaseError;
      },
    );

    assert.equal(forwardedError, databaseError);
  });
});