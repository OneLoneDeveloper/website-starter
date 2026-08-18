import { Router } from "express";
import { showCheckoutForm, chargePayment } from "./paymentsController.js";

const router = Router();

router.get("/", showCheckoutForm);
router.post("/charge", chargePayment);

export default router;
