// This file sets up the Express application, configures middleware, and registers routes. It also includes error handling for 404 (not found) and other errors. The application is exported for use in the server startup script (src/server.js).

// -------------------------------------------------------------------
// node.js built-in modules
// -------------------------------------------------------------------
import path from "node:path";
import { fileURLToPath } from "node:url";

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
import productsRoutes from "./features/products/productsRoutes.js";
import paymentsRoutes from "./features/payments/paymentsRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import environment from "./config/environment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          "https://checkout.sandbox.dev.clover.com",
          "https://www.google.com",
          "https://www.gstatic.com",
        ],
        frameSrc: [
          "'self'",
          "https://checkout.sandbox.dev.clover.com",
          "https://www.google.com",
        ],
        imgSrc: ["'self'", "data:", "https://checkout.sandbox.dev.clover.com"],
        connectSrc: ["'self'", "https://www.google.com"],
      },
    },
  }),
);

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
app.use("/products", productsRoutes);
app.use("/payments", paymentsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
