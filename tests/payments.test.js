import { describe, test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

describe("payment routes", () => {
  test("GET /payments redirects to the products page", async () => {
    const response = await request(app).get("/payments");

    assert.equal(response.status, 302);
    assert.equal(response.headers.location, "/products");
  });
});
