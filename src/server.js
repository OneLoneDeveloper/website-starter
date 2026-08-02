// This file is the entry point for the application. It starts the server and handles any startup errors.

import { pathToFileURL } from "node:url";
import app from "./app.js";
import environment from "./config/environment.js";
import { verifyEmailConnection } from "./config/emailClient.js";
import { connectDatabase } from "./services/databaseClient.js";

// This function starts the server, verifies the email connection if required, and connects to the database. It logs the server URL to the console and handles any startup errors by logging them and exiting the process with a non-zero exit code.
export async function startServer() {
  try {
    // Verify the email connection if the environment variable is set to true. This ensures that the email server is reachable and properly configured before starting the application.
    if (environment.verifyEmailOnStartup) {
      console.log("Verifying email server...");
      await verifyEmailConnection();
      console.log("Email server verified.");
    }

    // Connect to the database before starting the server. This ensures that the application has access to the database before handling any requests.
    console.log("Connecting to database...");
    await connectDatabase();
    console.log("Database connected.");

    // Start the server and log the URL to the console. The server listens on the port specified in the environment configuration.
    const server = app.listen(environment.port, () => {
      console.log(
        `Server running in ${environment.nodeEnv} mode at ` +
          `http://localhost:${environment.port}`,
      );
    });

    // Handle server errors by logging them and setting the process exit code to 1. These errors will only occur after the server has started, such as issues with network connectivity.
    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exitCode = 1;
    });

    // Return the server instance for potential use in testing or further configuration.
    return server;
  } catch (error) {
    // Handle any errors that occur during startup by logging them and exiting the process with a non-zero exit code. These errors will only occur during startup, such as issues with email verification or database connection.
    console.error("Application failed to start:", error);
    process.exit(1);
  }
}

// If this script is run directly (not imported as a module), start the server. This check ensures that the server is only started when this file is executed directly, and not when it is imported by other modules (e.g., for testing).
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  startServer();
}
