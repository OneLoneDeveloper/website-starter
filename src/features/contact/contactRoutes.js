import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
  getContactPage,
  submitContactForm,
} from "./contactController.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many contact form submissions. Please try again later.",
});

router.get("/", getContactPage);

router.post("/", contactLimiter, submitContactForm);

export default router;