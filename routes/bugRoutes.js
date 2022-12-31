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
router.get("/:projectId/", getBugs);
router.get("/:projectId/:bugId", getBug);
router.post("/:projectId/", trackBug);
router.patch("/:projectId/:bugId", updateBug);
router.delete("/:projectId/:bugId", deleteBug);

export default router;