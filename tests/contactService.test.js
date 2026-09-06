import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { processContactSubmission } from "../src/features/contact/contactService.js";

describe("contactService", () => {
  test("processes a contact submission", async () => {
    let sentMessage;

    const fakeSendEmail = async (message) => {
      sentMessage = message;
    };

    await processContactSubmission(
      {
        name: "Ada Lovelace",
        email: "ada@example.com",
        message: "I would like to learn more about your services.",
      },
      fakeSendEmail,
    );

    assert.equal(sentMessage.subject, "New contact message from Ada Lovelace");
    assert.equal(sentMessage.replyTo, "ada@example.com");
    assert.match(sentMessage.text, /I would like to learn more/);
  });

  test("propagates email delivery errors", async () => {
    const fakeSendEmail = async () => {
      throw new Error("Email service unavailable");
    };

    await assert.rejects(
      processContactSubmission(
        {
          name: "Ada Lovelace",
          email: "ada@example.com",
          message: "I would like to learn more about your services.",
        },
        fakeSendEmail,
      ),
      {
        message: "Email service unavailable",
      },
    );
  });
});
