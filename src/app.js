import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import homeRoutes from "./routes/homeRoutes.js";
import { notFound } from "../middleware/notFound.js";
import { errorHandler } from "../middleware/errorHandler.js";

// ES modules do not automatically provide __filename and __dirname.
// These two lines recreate them.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure EJS.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve files from the public folder.
app.use(express.static(path.join(__dirname, "../public")));

// Parse regular HTML form submissions.
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies.
app.use(express.json());

// A simple route used to check whether the server is running.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// Register the website routes.
app.use("/", homeRoutes);

// This must be placed after all valid routes.
app.use(notFound);

// Error middleware must be registered last.
app.use(errorHandler);

export default app;