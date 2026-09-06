import test from "node:test";
import assert from "node:assert/strict";
import { sendEmail } from "../src/services/emailService.js";

test("rejects an email without a recipient", async () => {
  await assert.rejects(
    sendEmail({
      subject: "Test subject",
      text: "Test message",
    }),
    {
      message: "An email recipient is required.",
    },
  );
});

test("rejects an email without a subject", async () => {
  await assert.rejects(
    sendEmail({
      to: "recipient@example.com",
      text: "Test message",
    }),
    {
      message: "An email subject is required.",
    },
  );
});

test("rejects an email without message content", async () => {
  await assert.rejects(
    sendEmail({
      to: "recipient@example.com",
      subject: "Test subject",
    }),
    {
      message: "The email requires text or HTML content.",
    },
  );
});

test("sends an email through the provided client", async () => {
  let sentMessage;

  const fakeEmailClient = {
    async sendMail(message) {
      sentMessage = message;

      return {
        messageId: "test-message-id",
        accepted: ["recipient@example.com"],
        rejected: [],
      };
    },
  };

  const result = await sendEmail(
    {
      to: "recipient@example.com",
      subject: "Test subject",
      text: "Test message",
      replyTo: "sender@example.com",
    },
    fakeEmailClient,
  );

  assert.equal(sentMessage.to, "recipient@example.com");
  assert.equal(sentMessage.subject, "Test subject");
  assert.equal(sentMessage.text, "Test message");
  assert.equal(sentMessage.replyTo, "sender@example.com");

  assert.deepEqual(result, {
    messageId: "test-message-id",
    accepted: ["recipient@example.com"],
    rejected: [],
  });
});


test("converts email client errors into a service error", async () => {
  const fakeEmailClient = {
    async sendMail() {
      throw new Error("SMTP connection failed");
    },
  };

  await assert.rejects(
    sendEmail(
      {
        to: "recipient@example.com",
        subject: "Test subject",
        text: "Test message",
      },
      fakeEmailClient,
    ),
    (error) => {
      assert.equal(error.message, "Unable to send email at this time.");
      assert.equal(error.statusCode, 503);
      assert.equal(error.cause.message, "SMTP connection failed");
      return true;
    },
  );
});