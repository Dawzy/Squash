const getProjects = (req, res) => {
	res.send("PROJECTS!");
}

const getProject = (req, res) => {
	res.send("A PROJECT!");
}

const createProject = (req, res) => {

	res.send("CREATED PROJECT");
}

const updateProject = (req, res) => {
	res.send("UPDATED PROJECT");
}

const deleteProject = (req, res) => {
	res.send("DELETED PROJECT!");
}

export {
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject
};