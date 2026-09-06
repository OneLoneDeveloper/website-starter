import { describe, test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

describe("contact routes", () => {
  test("GET /contact renders the contact page", async () => {
    const response = await request(app).get("/contact");

    assert.equal(response.status, 200);
    assert.match(response.text, /<h1>Contact Us<\/h1>/);
    assert.match(response.text, /action="\/contact"/);
  });

  test("POST /contact redisplays validation errors", async () => {
    const response = await request(app).post("/contact").send({
      name: "",
      email: "invalid-email",
      message: "",
    });

    assert.equal(response.status, 400);
    assert.match(response.text, /Please enter your name/);
    assert.match(response.text, /Please enter a valid email address/);
    assert.match(response.text, /Please enter a message/);
  });
});
