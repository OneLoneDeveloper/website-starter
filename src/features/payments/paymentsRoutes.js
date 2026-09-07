import { Router } from "express";
import { showCheckoutForm, chargePayment } from "./paymentsController.js";

const router = Router();

router.get("/", (req, res) => res.redirect("/products"));
router.get("/:productSlug", showCheckoutForm);
router.post("/:productSlug/charge", chargePayment);

export default router;
