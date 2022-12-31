import Project from "../models/Project.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";

/*
	@desc	Get all bugs from a project
	@route	/api/v1/bugs/:projectId
	@access	Private
*/
const getBugs = (req, res) => {
	const { projectId } = req.params;
	res.send(`GOT ALL BUGS for project: ${projectId}`);
}

/*
	@desc	Get a bug for a project
	@route	/api/v1/bugs/:projectId/:bugId
	@access	Private
*/
const getBug = (req, res) => {
	const { projectId, bugId } = req.params;
	res.send(`GOT BUG: ${bugId} for project: ${projectId}`);
}

/*
	@desc	Add a new bug to track
	@route	/api/v1/bugs/:projectId
	@access	Private
*/
const trackBug = (req, res) => {
	const { projectId } = req.params;
	res.send(`TRACKING NEW BUG FOR PROJECT ${projectId}`);
}

/*
	@desc	Update info about an existing bug
	@route	/api/v1/bugs/:projectId/:bugId
	@access	Private
*/
const updateBug = (req, res) => {
	const { projectId, bugId } = req.params;
	res.send(`UPDATED BUG: ${bugId} for project: ${projectId}`);
}

/*
	@desc	Delete a bug from a project
	@route	/api/v1/bugs/:projectId/:bugId
	@access	Private
*/
const deleteBug = (req, res) => {
	const { projectId, bugId } = req.params;
	res.send(`DELETED BUG: ${bugId} for project: ${projectId}`);
}

export {
	getBugs,
	getBug,
	trackBug,
	updateBug,
	deleteBug
};