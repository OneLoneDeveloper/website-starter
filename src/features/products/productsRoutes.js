import { Router } from "express";
import { showProducts } from "./productsController.js";

const router = Router();

router.get("/", showProducts);

export default router;
