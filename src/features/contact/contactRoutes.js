import { Router } from "express";

import {
  getContactPage,
  submitContactForm,
} from "./contactController.js";

const router = Router();

router.get("/", getContactPage);

router.post("/", submitContactForm);

export default router;