import Project from "../models/Project.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";

// Util method shared between projectController.js and bugController.js
const getProjectWithId = async (projectId) => {
	const project = await Project.findById(projectId);

	// Check if the project exists in the database
	if (!project) {
		// It does not exist, that means the projectId might have been a valid id, but
		// no project document exists with such id
		throw new ErrorResponse(`Project with id ${projectId} not found.`, 404);
	}

	// Return the project found
	return project;
}

/*
	@desc	Get all projects
	@route	/api/v1/projects
	@access	Private
*/
const getProjects = asyncHandler(async (req, res, next) => {
	const projects = await Project.find();

	res.status(200).json({
		success: true,
		count: projects.length,
		data: projects
	});
});

/*
	@desc	Get a project
	@route	GET /api/v1/projects/:projectId
	@access	Private
*/
const getProject = asyncHandler(async (req, res, next) => {
	const { projectId } = req.params;
	const project = await getProjectWithId(projectId);

	res.status(200).json({
		success: true,
		data: project
	});
});

/*
	@desc	Create a project
	@route	POST /api/v1/:projectId
	@access	Private
*/
const createProject = asyncHandler(async (req, res, next) => {
	const project = await Project.create(req.body);

	res.status(201).json({
		success: true,
		data: project
	});
});

/*
	@desc	Update a project
	@route	PATCH /api/v1/projects/:projectId
	@access	Private
*/
const updateProject = asyncHandler(async (req, res, next) => {
	const { projectId } = req.params;
	const project = await Project.findByIdAndUpdate(projectId, req.body, {
		new: true, 				// So that the updated project is returned
		runValidators: true		// Make sure updated document is valid
	});

	if (!project) {
		return next(
			new ErrorResponse(`Project with id ${projectId} not found. Or validation failed.`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: project
	});
});

/*
	@desc	Delete a project
	@route	DELETE /api/v1/projects/:projectId
	@access	Private
*/
const deleteProject = asyncHandler(async (req, res, next) => {
	const { projectId } = req.params;
	const project = await Project.findByIdAndDelete(projectId);

	if (!project) {
		return next(
			new ErrorResponse(`Project with id ${projectId} not found.`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: {}
	});
});

// Export controllers
export {
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject,

	getProjectWithId
};