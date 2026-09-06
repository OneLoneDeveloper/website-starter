import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeContactFormData,
  validateContactForm,
} from "../src/features/contact/contactValidation.js";

describe("contactValidation", () => {
  test("normalizes contact form data", () => {
    const result = normalizeContactFormData({
      name: "  Ada     Lovelace    ",
      email: "  AdA@EXAmpLE.COM ",
      message: " Hello there ",
    });

    assert.deepEqual(result, {
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hello there",
    });
  });

  test("rejects an empty contact form", () => {
    const errors = validateContactForm({});

    assert.deepEqual(errors, {
      name: "Please enter your name.",
      email: "Please enter your email address.",
      message: "Please enter a message.",
    });
  });

  test("rejects an invalid email and short message", () => {
    const errors = validateContactForm({
      name: "Ada Lovelace",
      email: "not-an-email",
      message: "Too short",
    });

    assert.deepEqual(errors, {
      email: "Please enter a valid email address.",
      message: "Your message must be at least 20 characters.",
    });
  });
});
