import { getProducts } from "./productsService.js";

export async function showProducts(req, res, next) {
  try {
    const products = await getProducts();

    res.status(200).render("pages/products", {
      title: "Products",
      products,
    });
  } catch (error) {
    next(error);
  }
}
