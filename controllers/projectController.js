import Project from "../models/Project.js";

const getProjects = async (req, res) => {
	try {
		const projects = await Project.find();

		res.status(200).json({
			success: true,
			count: projects.length,
			data: projects
		});

	} catch {
		res.status(400).json({ success: false });
	}
}

const getProject = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);

		// If not returned, will continue and send next res.send() call
		if (!project) return res.status(400).json({ success: false });

		res.status(200).json({
			success: true,
			data: project
		});

	} catch {
		res.status(400).json({ success: false });
	}
}

const createProject = async (req, res) => {
	try {
		const project = await Project.create(req.body);

		res.status(201).json({
			success: true,
			data: project
		});

	} catch {
		res.status(400).json({ success: false });
	}
}

const updateProject = async (req, res) => {
	try {
		const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		if (!project) return res.status(400).json({ success: false });

		res.status(200).json({
			success: true,
			data: project
		});

	} catch {
		res.status(400).json({ success: false });
	}
}

const deleteProject = async (req, res) => {
	try {
		const project = await Project.findByIdAndDelete(req.params.id);

		res.status(200).json({
			success: true,
			data: {}
		});

	} catch {
		res.status(400).json({ success: false });
	}
}

export {
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject
};