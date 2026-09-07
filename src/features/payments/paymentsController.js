import { createCharge } from "../../services/paymentService.js";
import environment from "../../config/environment.js";
import { getProductBySlug } from "../products/productsService.js";

export async function showCheckoutForm(
  req,
  res,
  next,
  getProductBySlugFunction = getProductBySlug,
) {
  try {
    const product = await getProductBySlugFunction(req.params.productSlug);

    if (!product || !product.inStock) {
      const error = new Error("Product is not available.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).render("pages/payments/checkout", {
      title: "Checkout",
      includeCloverSdk: true,
      cloverSdkUrl: environment.clover.cloverSdkUrl,
      publicKey: environment.clover.publicKey,
      merchantId: environment.clover.merchantId,
      product,
    });
  } catch (error) {
    next(error);
  }
}

export async function chargePayment(
  req,
  res,
  next,
  createChargeFunction = createCharge,
  getProductBySlugFunction = getProductBySlug,
) {
  try {
    const { cloverToken } = req.body;
    const product = await getProductBySlugFunction(req.params.productSlug);

    if (!product || !product.inStock) {
      const error = new Error("Product is not available.");
      error.statusCode = 404;
      throw error;
    }

    const result = await createChargeFunction({
      amount: product.price,
      token: cloverToken,
      clientIp: req.ip,
    });

    console.log("Clover response:", result);

    res.send("Payment successful!");
  } catch (error) {
    next(error);
  }
}
