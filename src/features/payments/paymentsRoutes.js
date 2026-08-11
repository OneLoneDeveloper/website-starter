import { Router } from "express";
import { processPayment } from "./paymentsController.js";

const router = Router();

router.get("/", processPayment);
router.post("/", processPayment);

export default router;
