import environment from "../../config/environment.js";
import { sendEmail } from "../../services/emailService.js";

export async function processContactSubmission({ name, email, message }) {
  const subject = `New contact message from ${name}`;

  await sendEmail({
    to: environment.email.emailFromAddress,

    subject,

    text: `Name:
${name}

Email:
${email}

Message:
${message}
`,

    replyTo: email,
  });
}
