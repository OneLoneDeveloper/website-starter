import { Router } from "express";

import { showHome } from "./pagesController.js";

const router = Router();

// GET /
router.get("/", showHome);

export default router;