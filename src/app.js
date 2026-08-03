// This file sets up the Express application, configures middleware, and registers routes. It also includes error handling for 404 (not found) and other errors. The application is exported for use in the server startup script (src/server.js).

// -------------------------------------------------------------------
// node.js built-in modules
// -------------------------------------------------------------------
import path from "node:path";
import { fileURLToPath } from "node:url";
// The dns/promises module provides an API for performing DNS lookups using promises. It is used here only in development environments dues to issues with MongoDB not connecting otherwise.
import dns from "node:dns/promises";

// -------------------------------------------------------------------
// npm modules
// -------------------------------------------------------------------
import express from "express";
import expressLayouts from "express-ejs-layouts";
import helmet from "helmet";

// -------------------------------------------------------------------
// local modules
// -------------------------------------------------------------------
import pagesRoutes from "./features/pages/pagesRoutes.js";
import contactRoutes from "./features/contact/contactRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import environment from "./config/environment.js";

// In development environments, we set custom DNS servers to avoid issues with MongoDB connections.
if (environment.isDevelopment) {
  dns.setServers(["1.1.1.1", "1.0.0.1"]);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/", pagesRoutes);
app.use("/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
