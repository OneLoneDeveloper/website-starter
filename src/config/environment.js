const validNodeEnvironments = [
  "development",
  "test",
  "production"
];

// Use "development" when NODE_ENV has not been provided.
const nodeEnv = process.env.NODE_ENV ?? "development";

// Make sure NODE_ENV contains one of the values we support.
if (!validNodeEnvironments.includes(nodeEnv)) {
  throw new Error(
    `Invalid NODE_ENV value: "${nodeEnv}". ` +
    `Expected development, test, or production.`
  );
}

// Environment variables are strings, so convert PORT into a number.
const port = Number(process.env.PORT ?? 3000);

// Make sure the port is a valid network port number.
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(
    `Invalid PORT value: "${process.env.PORT}". ` +
    "PORT must be an integer between 1 and 65535."
  );
}

const environment = Object.freeze({
  nodeEnv,
  port,

  // Convenient Boolean values so other files do not need to compare strings.
  isDevelopment: nodeEnv === "development",
  isTest: nodeEnv === "test",
  isProduction: nodeEnv === "production"
});

export default environment;