import { Router } from "express";

import { showHome } from "../controllers/homeController.js";

const router = Router();

// GET /
router.get("/", showHome);

export default router;