import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import expressLayouts from "express-ejs-layouts";
import helmet from "helmet";

import pagesRoutes from "./features/pages/pagesRoutes.js";
import contactRoutes from "./features/contact/contactRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import environment from "./config/environment.js";
import dns from "node:dns/promises";

if (environment.NODE_ENV !== "production") {
  dns.setServers(["1.1.1.1", "1.0.0.1"]);
}

// ES modules do not automatically provide __filename and __dirname.
// These two lines recreate them.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Add protective HTTP headers.
app.use(helmet());

// Configure EJS.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Enable layouts.
app.use(expressLayouts);

// Tell Express which layout to use by default.
app.set("layout", "layouts/main");

// Serve files from the public folder.
app.use(express.static(path.join(__dirname, "../public")));

// Parse regular HTML form submissions with a small size limit.
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Parse JSON request bodies with a small size limit.
app.use(express.json({ limit: "10kb" }));

// A simple route used to check whether the server is running.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// Register the website routes.
app.use("/", pagesRoutes);
app.use("/contact", contactRoutes);

// This must be placed after all valid routes.
app.use(notFound);

// Error middleware must be registered last.
app.use(errorHandler);

export default app;
