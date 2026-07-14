import app from "./app.js";
import environment from "../config/environment.js";

const server = app.listen(environment.port, () => {
  console.log(
    `Server running in ${environment.nodeEnv} mode at ` +
    `http://localhost:${environment.port}`
  );
});

// Handle errors that occur while starting or running the HTTP server.
server.on("error", (error) => {
  console.error("Server error:", error);
  process.exitCode = 1;
});