import express from "express";
import { 
	getBugs,
	getBug,
	trackBug,
	updateBug,
	deleteBug
} from "../controllers/bugController.js";

const router = express.Router();

// Bug-specific routes
router.get("/", getBugs);
router.get("/:id", getBug);
router.post("/", trackBug);
router.patch("/:id", updateBug);
router.delete("/:id", deleteBug);

export default router;