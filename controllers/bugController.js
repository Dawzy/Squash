const getBugs = (req, res) => {
	res.send("GOT ALL PROJECT BUGS!");
}

const getBug = (req, res) => {
	res.send("GOT A PROJECT BUG");
}

const trackBug = (req, res) => {
	res.send("ADDED A BUG TO TRACK!");
}

const updateBug = (req, res) => {
	res.send("UPDATED A BUG BASED ON ITS PROPERTY SENT");
}

const deleteBug = (req, res) => {
	res.send("DELETED A BUG");
}

export {
	getBugs,
	getBug,
	trackBug,
	updateBug,
	deleteBug
};