import { describe, test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

describe("app routes", () => {
  test("GET /health returns an OK status", async () => {
    const response = await request(app).get("/health");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { status: "ok" });
  });

  test("GET /unknown-route returns a 404 page", async () => {
    const response = await request(app).get("/unknown-route");

    assert.equal(response.status, 404);
    assert.match(response.text, /Page Not Found/);
  });

  test("GET / renders the home page", async () => {
    const response = await request(app).get("/");

    assert.equal(response.status, 200);
    assert.match(
      response.text,
      /Showcase your content with clear structure and polished components/,
    );
  });
});
