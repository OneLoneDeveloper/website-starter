import { createCharge } from "../../services/paymentService.js";

export async function showCheckoutForm(req, res, next) {
  res.status(200).render("pages/payments/checkout", {
    title: "Checkout",
    includeCloverSdk: true,
  });
}

export async function chargePayment(req, res) {
  try {
    const { amount, cloverToken } = req.body;

    const result = await createCharge({
      amount,
      token: cloverToken,
      clientIp: req.ip,
    });

    console.log("Clover response:", result);

    res.send("Payment successful!");
  } catch (error) {
    next(error);
  }
}