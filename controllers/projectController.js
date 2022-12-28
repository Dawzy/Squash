import Project from "../models/Project.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";

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
	@route	GET /api/v1/projects/:id
	@access	Private
*/
const getProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findById(req.params.id);

	// Project not found, return error
	if (!project) {
		// ObjectId is valid, but not in database
		return next(
			new ErrorResponse(`Project with id ${req.params.id} not found.`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: project
	});
});

/*
	@desc	Create a project
	@route	POST /api/v1/projects
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
	@route	PATCH /api/v1/projects/:id
	@access	Private
*/
const updateProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if (!project) {
		return next(
			new ErrorResponse(`Project with id ${req.params.id} not found.`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: project
	});
});

/*
	@desc	Delete a project
	@route	DELETE /api/v1/projects/:id
	@access	Private
*/
const deleteProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findByIdAndDelete(req.params.id);

	if (!project) {
		return next(
			new ErrorResponse(`Project with id ${req.params.id} not found.`, 404)
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
	deleteProject
};