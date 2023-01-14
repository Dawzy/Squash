import express from "express";
import { 
	getBugs,
	getBug,
	trackBug,
	updateBug,
	deleteBug
} from "../controllers/bugController.js";

const router = express.Router({ mergeParams: true });

// Bug-specific routes
router.get("/", getBugs);
router.get("/:bugId", getBug);
router.post("/", trackBug);
router.patch("/:bugId", updateBug);
router.delete("/:bugId", deleteBug);

export default router;