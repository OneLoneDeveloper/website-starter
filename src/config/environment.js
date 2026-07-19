const validNodeEnvironments = ["development", "test", "production"];

// Use "development" when NODE_ENV has not been provided.
const nodeEnv = process.env.NODE_ENV ?? "development";

// Make sure NODE_ENV contains one of the values we support.
if (!validNodeEnvironments.includes(nodeEnv)) {
  throw new Error(
    `Invalid NODE_ENV value: "${nodeEnv}". ` +
      `Expected development, test, or production.`,
  );
}

// Environment variables are strings, so convert PORT into a number.
const port = Number(process.env.PORT ?? 3000);

// Make sure the port is a valid network port number.
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(
    `Invalid PORT value: "${process.env.PORT}". ` +
      "PORT must be an integer between 1 and 65535.",
  );
}

function parseBoolean(value, fallback = false) {
  if (value === undefined) {
    return fallback;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  throw new Error(`Expected "true" or "false", but received "${value}".`);
}

const smtpPort = Number(process.env.SMTP_PORT ?? 587);

if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
  throw new Error(`Invalid SMTP_PORT value: "${process.env.SMTP_PORT}".`);
}

const requiredEmailVariables = [
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "EMAIL_FROM_ADDRESS",
];

for (const variableName of requiredEmailVariables) {
  if (!process.env[variableName]) {
    throw new Error(`${variableName} environment variable is missing.`);
  }
}

const environment = Object.freeze({
  nodeEnv,
  port,

  // Convenient Boolean values so other files do not need to compare strings.
  isDevelopment: nodeEnv === "development",
  isTest: nodeEnv === "test",
  isProduction: nodeEnv === "production",

  // Email server connection settings.
  email: Object.freeze({
    smtpHost: process.env.SMTP_HOST,
    smtpPort,
    smtpSecure: parseBoolean(process.env.SMTP_SECURE, false),
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    fromName: process.env.EMAIL_FROM_NAME ?? "Website",
    fromAddress: process.env.EMAIL_FROM_ADDRESS,
  }),

  // Whether to verify the email connection on startup or wait for the first email to be sent.
  verifyEmailOnStartup: parseBoolean(
    process.env.VERIFY_EMAIL_ON_STARTUP,
    false,
  ),
});

export default environment;
