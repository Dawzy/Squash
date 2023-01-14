import express from "express";
import { 
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject
} from "../controllers/projectController.js";

import bugRouter from "./bugRoutes.js";

const router = express.Router();

// Re-route to bug specific routes
router.use("/:projectId/bugs", bugRouter);

// Project-specific routes
router.get("/", getProjects);
router.get("/:projectId", getProject);
router.post("/", createProject);
router.patch("/:projectId", updateProject); // Ignores bug changes
router.delete("/:projectId", deleteProject);

export default router;