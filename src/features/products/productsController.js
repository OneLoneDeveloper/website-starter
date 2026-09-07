import { getProducts } from "./productsService.js";

export async function showProducts(
  req,
  res,
  next,
  getProductsFunction = getProducts,
) {
  try {
    const products = await getProductsFunction();

    res.status(200).render("pages/products", {
      title: "Products",
      products,
    });
  } catch (error) {
    next(error);
  }
}
