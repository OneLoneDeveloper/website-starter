import { connectDatabase } from "../../services/databaseClient.js";
import { Product } from "./productModel.js";

export async function getProducts() {
  return Product.find({}).sort({ createdAt: -1 }).lean();
}
