// This file contains the service function that processes the contact form submission and sends an email with the provided name, email, and message. 

import environment from "../../config/environment.js";
import { sendEmail } from "../../services/emailService.js";

// This is the function that actually processes the contact form submission and sends an email with the provided name, email, and message. It normalizes the message by replacing multiple whitespace characters with a single space and trimming leading/trailing whitespace before sending the email.
export async function processContactSubmission({ name, email, message }) {
  const subject = `New contact message from ${name}`;
  const normalizedMessage = message.replace(/\s+/g, " ").trim();

  await sendEmail({
    to: environment.email.emailFromAddress,

    subject,

    text: `Name:
${name}

Email:
${email}

Message:
${normalizedMessage}
`,

    replyTo: email,
  });
}

const contactService = {
  processContactSubmission,
};

export default contactService;
