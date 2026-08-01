// This file contains the tests for the application, including tests for the health check endpoint, home page rendering, 404 page handling, contact form data normalization, and request size limit enforcement. It uses the Node.js test module and Supertest for HTTP assertions.

import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";
import { normalizeContactFormData } from "../src/features/contact/contactValidation.js";

// Test that the health check endpoint returns a successful response with the expected JSON body.
test("GET /health returns a successful health response", async () => {
  const response = await request(app)
    .get("/health")
    .expect("Content-Type", /json/)
    .expect(200);

  assert.deepEqual(response.body, {
    status: "ok"
  });
});

// Test that the home page renders correctly and contains the expected content.
test("GET / renders the home page", async () => {
  const response = await request(app)
    .get("/")
    .expect("Content-Type", /html/)
    .expect(200);

  assert.match(
    response.text,
    /Build client websites without starting from scratch\./
  );
});

// Test that a request to a missing page returns the 404 page with the appropriate message.
test("GET /missing-page returns the 404 page", async () => {
  const response = await request(app)
    .get("/missing-page")
    .expect("Content-Type", /html/)
    .expect(404);

  assert.match(response.text, /Page not found/i);
  assert.match(response.text, /Page not found: \/missing-page/i);
});

// Test that the normalizeContactFormData function correctly removes control characters, replaces multiple whitespace characters with a single space, and trims leading/trailing whitespace from the form data.
test("normalizeContactFormData removes control characters and trims values", () => {
  const normalized = normalizeContactFormData({
    name: "  Alice\r\nSmith  ",
    email: "  hello@example.com\n",
    message: "Hello\r\nworld\tthere"
  });

  assert.deepEqual(normalized, {
    name: "Alice Smith",
    email: "hello@example.com",
    message: "Hello world there"
  });
});

// Test that the application rejects request bodies that exceed the configured size limit, returning a 413 status code and an appropriate error message.
test("POST /contact rejects bodies that exceed the configured size limit", async () => {
  const oversizedBody = "name=" + "a".repeat(12000);

  const response = await request(app)
    .post("/contact")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send(oversizedBody)
    .expect(413);

  assert.match(response.text, /entity too large/i);
});