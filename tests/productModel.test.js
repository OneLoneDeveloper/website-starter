import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { Product } from "../src/features/products/productModel.js";

describe("Product model", () => {
  // Test that the Product model requires a name and price
  test("requires a product name and price", async () => {
    const product = new Product({});

    await assert.rejects(product.validate(), (error) => {
      assert.equal(error.errors.name.kind, "required");
      assert.equal(error.errors.price.kind, "required");
      return true;
    });
  });

  // Test that the Product model applies default values for inStock and currency
  test("applies product defaults and trims values", () => {
    const product = new Product({
      name: "  Coffee Mug  ",
      price: 12.5,
      currency: "usd",
    });

    assert.equal(product.name, "Coffee Mug");
    assert.equal(product.currency, "USD");
    assert.equal(product.inStock, true);
  });

  // Test that the Product model rejects a negative price
  test("rejects a negative price", async () => {
    const product = new Product({
      name: "Coffee Mug",
      price: -1,
    });

    await assert.rejects(product.validate(), (error) => {
      assert.equal(error.errors.price.kind, "min");
      return true;
    });
  });
});
