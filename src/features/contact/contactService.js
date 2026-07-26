import environment from "../../config/environment.js";
import { sendEmail } from "../../services/emailService.js";

export async function processContactSubmission({ name, email, message }) {
  await sendEmail({
    to: environment.email.fromAddress,

    subject: `New contact message from ${name}`,

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
