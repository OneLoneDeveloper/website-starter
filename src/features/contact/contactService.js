import environment from "../../config/environment.js";
import { sendEmail } from "../../services/emailService.js";

export async function processContactSubmission(
  { name, email, message },
  sendEmailFunction = sendEmail,
) {
  const subject = `New contact message from ${name}`;

  await sendEmailFunction({
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
