import { connectDatabase } from "../../services/databaseClient.js";
import { Product } from "./productModel.js";

export async function getProducts(productModel = Product) {
  return productModel.find({}).sort({ createdAt: -1 }).lean();
}

export async function getProductBySlug(productSlug, productModel = Product) {
  return productModel.findOne({ slug: productSlug }).lean();
}