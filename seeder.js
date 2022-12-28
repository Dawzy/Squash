/*
	Database seeder so we dont have to repopulate or clear manually.
*/
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";
import { resolve } from "path"; // Needed to get current working directory

// Load env (for URI)
dotenv.config();

// Connect to database
mongoose.set("strictQuery", false); 	// Avoid warnings
mongoose.connect(process.env.DB_URI, {
	// Avoid more  warnings
	useNewUrlParser: true
});

// Read data (JSON files)
const projects = JSON.parse(fs.readFileSync(`${resolve()}/MockData/projects.json`, "utf-8"));

// Populate database
const populateDatabase = async () => {
	try {
		await Project.create(projects);

		console.log("Populated database.");
	} catch(err) {
		console.log(err);
	}
	process.exit();
}

// Clear database
const clearDatabase = async () => {
	try {
		await Project.deleteMany();

		console.log("Cleared database.");
	} catch(err) {
		console.log(err);
	}
	process.exit();
}

// -p Populate database
// -c Clear database
if (process.argv[2] === "-p") {
	populateDatabase();
} else if (process.argv[2] === "-c") {
	clearDatabase();
}
