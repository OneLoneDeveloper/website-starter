import nodemailer from "nodemailer";

import environment from "./environment.js";

const emailClient = nodemailer.createTransport({
  host: environment.email.smtpHost,
  port: environment.email.smtpPort,
  secure: environment.email.smtpSecure,

  auth: {
    user: environment.email.smtpUser,
    pass: environment.email.smtpPassword,
  },
});

export async function verifyEmailConnection() {
  await emailClient.verify();
}

export default emailClient;
