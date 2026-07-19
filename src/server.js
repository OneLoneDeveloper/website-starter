import app from "./app.js";
import environment from "./config/environment.js";
import { verifyEmailConnection } from "./config/emailClient.js";

async function startServer() {
  try {
    if (environment.verifyEmailOnStartup) {
      console.log("Verifying email server...");

      await verifyEmailConnection();

      console.log("Email server verified.");
    }

    const server = app.listen(environment.port, () => {
      console.log(
        `Server running in ${environment.nodeEnv} mode at ` +
          `http://localhost:${environment.port}`,
      );
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exitCode = 1;
    });
  } catch (error) {
    console.error("Application failed to start:", error);

    process.exit(1);
  }
}

startServer();
