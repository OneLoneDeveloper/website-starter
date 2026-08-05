// This file contains the tests for the application, including tests for the health check endpoint, home page rendering, 404 page handling, contact form data normalization, and request size limit enforcement. It uses the Node.js test module and Supertest for HTTP assertions.

import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import request from "supertest";

import app from "../src/app.js";
import { normalizeContactFormData } from "../src/features/contact/contactValidation.js";
import contactService from "../src/features/contact/contactService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

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
    /Showcase your content with clear structure and polished components\./
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

// Test that the normalizeContactFormData function removes control characters, preserves intentional line breaks, and trims leading/trailing whitespace from the form data.
test("normalizeContactFormData removes control characters and trims values", () => {
  const normalized = normalizeContactFormData({
    name: "  Alice\r\nSmith  ",
    email: "  hello@example.com\n",
    message: "Hello\r\nworld\tthere"
  });

  assert.deepEqual(normalized, {
    name: "Alice Smith",
    email: "hello@example.com",
    message: "Hello\nworld there"
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

test("POST /contact returns validation errors for invalid submissions", async () => {
  const response = await request(app)
    .post("/contact")
    .type("form")
    .send({
      name: "A",
      email: "not-an-email",
      message: "too short",
    })
    .expect(400);

  assert.match(response.text, /Please enter a valid name\./i);
  assert.match(response.text, /Please enter a valid email address\./i);
  assert.match(response.text, /Your message must be at least 20 characters\./i);
});

test("POST /contact renders the error page when email sending fails", async () => {
  const previousProcessContactSubmission = contactService.processContactSubmission;
  contactService.processContactSubmission = async () => {
    throw new Error("Simulated send failure");
  };

  try {
    const response = await request(app)
      .post("/contact")
      .type("form")
      .send({
        name: "Alice Example",
        email: "alice@example.com",
        message: "This is a long enough message to pass validation.",
      })
      .expect(500);

    assert.match(response.text, /Server Error/i);
    assert.match(response.text, /Simulated send failure/i);
  } finally {
    contactService.processContactSubmission = previousProcessContactSubmission;
  }
});

test("environment validation throws for unsupported values", () => {
  const result = spawnSync(
    process.execPath,
    ["--env-file=.env", "--input-type=module", "-e", "import('./src/config/environment.js')"],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        NODE_ENV: "staging",
      },
      encoding: "utf8",
    },
  );

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Invalid NODE_ENV value/i);
});

test("server start smoke test exposes a bootable entrypoint", async () => {
  const { startServer } = await import("../src/server.js");

  assert.equal(typeof startServer, "function");
});