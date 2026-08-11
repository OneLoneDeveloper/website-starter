export async function processPayment(req, res, next) {
  res.status(200).render("pages/payments/checkout", {
    title: "Checkout",
    includeCloverSdk: true,
  });
}
