// This file defines the routes for the contact feature of the application. It includes a GET route for displaying the contact page and a POST route for submitting the contact form. The POST route is protected by a rate limiter to prevent abuse.

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