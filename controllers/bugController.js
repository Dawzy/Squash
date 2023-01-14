import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import { getProjectWithId } from "./projectController.js";

/*
	@desc	Get all bugs from a project
	@route	/api/v1/projects/:projectId/bugs
	@access	Private
*/
const getBugs = asyncHandler(async (req, res, next) => {
	// Get project, then send back the bugs it has
	const { projectId } = req.params;
	const project =  await getProjectWithId(projectId);

	res.status(200).json({
		success: true,
		count: project.bugs.length,
		data: project.bugs
	});
});

/*
	@desc	Get a bug for a project
	@route	/api/v1/projects/:projectId/bugs/:bugId
	@access	Private
*/
const getBug = asyncHandler(async (req, res, next) => {
	const { projectId, bugId } = req.params;
	const project =  await getProjectWithId(projectId);
	const bug = project.bugs.id(bugId);
	
	// Check if the bug exists in the project's list of bugs
	if (!bug) {
		// It does not exist, that means the bugId might have been a valid id, but
		// no bug subdocument exists with such id
		throw new ErrorResponse(`Bug with id ${bugId} not found.`, 404);
	}

	// Send back bug
	res.status(200).json({
		success: true,
		data: bug
	});

});

/*
	@desc	Add a new bug to track
	@route	POST /api/v1/projects/:projectId/bugs
	@access	Private
*/
const trackBug = asyncHandler(async (req, res, next) => {
	const { projectId } = req.params;
	const project =  await getProjectWithId(projectId);

	// Reject bugs where _id is being set manually
	if ( Object.keys(req.body).includes("_id") ) {
		return next( new ErrorResponse("Cannot have _id as part of bug.", 400));
	}

	// Add new bug to track
	project.bugs.push( req.body );

	// Save in database
	project.save(err => {
		if (err) return next( new ErrorResponse(err, 400) );
	});

	res.status(201).json({
		success: true,
		data: project.bugs[ project.bugs.length - 1 ]
	});
});

/*
	@desc	Update info about an existing bug
	@route	/api/v1/projects/:projectId/bugs/:bugId
	@access	Private
*/
const updateBug = asyncHandler(async (req, res, next) => {
	const { projectId, bugId } = req.params;
	const project =  await getProjectWithId(projectId);
	const bug = project.bugs.id(bugId);
	
	// Check if the bug exists in the project's list of bugs
	if (!bug) {
		// It does not exist, that means the bugId might have been a valid id, but
		// no bug subdocument exists with such id
		return next(new ErrorResponse(`Bug with id ${bugId} not found.`, 404) );
	}

	// Get properties to update
	const keys = Object.keys(req.body);

	// If one of the fields is the id, then error. Not allowed.
	if (keys.includes("_id")) {
		return next( new ErrorResponse("Not allowed to change value of _id.", 400) );
	}

	// Iterate through properties and update them
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		bug[key] = req.body[key];
	}

	// Save in database
	project.save(err => {
		if (err) return next( new ErrorResponse(err, 400) );

		// Got here with no errors
		res.status(201).json({
			success: true,
			data: project.bugs.id(bugId)
		});
	});
});

/*
	@desc	Delete a bug from a project
	@route	/api/v1/projects/:projectId/bugs/:bugId
	@access	Private
*/
const deleteBug = asyncHandler(async (req, res, next) => {
	const { projectId, bugId } = req.params;
	const project = await getProjectWithId(projectId);
	
	// Get index of bug to delete
	let index = project.bugs.findIndex( bug => bug._id.toString() === bugId );
	let bugExists = index !== -1;
	console.log(index);
	
	// Check if bug exists
	if (!bugExists) {
		return next( new ErrorResponse(`Bug with id ${bugId} does not exist.`, 400) );
	}

	// Remove bug
	console.log(project.bugs.length);
	project.bugs.splice(index, 1);
	console.log(project.bugs.length);

	// Save in database
	project.save(err => {
		if (err) return next( new ErrorResponse(err, 500) );

		// Got here with no errors
		res.status(201).json({
			success: true,
			data: {}
		});
	});

});

export {
	getBugs,
	getBug,
	trackBug,
	updateBug,
	deleteBug
};