import emailClient from "../config/emailClient.js";
import environment from "../config/environment.js";

export async function sendEmail({ to, subject, text, html, replyTo }) {
  if (!to) {
    throw new Error("An email recipient is required.");
  }

  if (!subject) {
    throw new Error("An email subject is required.");
  }

  if (!text && !html) {
    throw new Error("The email requires text or HTML content.");
  }

  const message = {
    from: {
      name: environment.email.fromName,
      address: environment.email.fromAddress,
    },

    to,
    subject,
    text,
    html,
    replyTo,
  };

  try {
    const result = await emailClient.sendMail(message);

    return {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
    };
  } catch (error) {
    console.error("Failed to send email:", error);

    const serviceError  = new Error("Unable to send email at this time.");
    serviceError.statusCode = 503; // Service Unavailable

    throw serviceError;
  }
}
