import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  getProductBySlug,
  getProducts,
} from "../src/features/products/productsService.js";

describe("productsService", () => {
  // Test to ensure that the getProducts function retrieves products sorted by newest first
  test("gets products sorted by newest first", async () => {
    const expectedProducts = [{ name: "New product" }, { name: "Old product" }];

    const fakeProductModel = {
      find(query) {
        assert.deepEqual(query, {});

        return {
          sort(sortOrder) {
            assert.deepEqual(sortOrder, { createdAt: -1 });

            return {
              lean: async () => expectedProducts,
            };
          },
        };
      },
    };

    const products = await getProducts(fakeProductModel);

    assert.deepEqual(products, expectedProducts);
  });

  // Test to ensure that the getProducts function propagates errors from the product model
  test("propagates product lookup errors", async () => {
    const databaseError = new Error("Database unavailable");

    const fakeProductModel = {
      find() {
        throw databaseError;
      },
    };

    await assert.rejects(getProducts(fakeProductModel), {
      message: "Database unavailable",
    });
  });

  test("gets a product by slug", async () => {
    const expectedProduct = { name: "Coffee Mug", price: 25 };
    const fakeProductModel = {
      findOne(query) {
        assert.deepEqual(query, { slug: "coffee-mug" });

        return {
          lean: async () => expectedProduct,
        };
      },
    };

    const product = await getProductBySlug("coffee-mug", fakeProductModel);

    assert.deepEqual(product, expectedProduct);
  });
});
