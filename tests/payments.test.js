import { describe, test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

describe("payment routes", () => {
  test("GET /payments renders the checkout page", async () => {
    const response = await request(app).get("/payments");

    assert.equal(response.status, 200);
    assert.match(response.text, /<h1>Pay now<\/h1>/);
    assert.match(response.text, /action="\/payments\/charge"/);
  });
});
