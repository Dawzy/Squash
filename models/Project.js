import mongoose from "mongoose";
import BugSchema from "./Bug.js";

const ProjectSchema = new mongoose.Schema({
	// Name
	name: {
		type: String,
		required: [true, "Please add a name."],
		trim: true,
		maxlength: [30, "Name must be lower than 30 characters."],
		minlength: [5, "Name must contain at least 5 characters"]
	},

	// Creator, reference some user
	// creator: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	required: [true, "Please enter creator of project."],
	// 	ref: "User",
	// },

	// // Admins, list of Users
	// admins: {
	// 	type: [{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User"
	// 	}]
	// },

	// // Members, list of Users
	// members: {
	// 	type: [{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User"
	// 	}]
	// },

	// Bugs
	bugs: {
		type: [BugSchema]
	},

	// Created at
	createdAt: {
		type: Date,
		default: Date.now
	}
});


// When users are added
// ProjectSchema.pre("save", function() {
// 	this.admins.push( this.creator );
// 	this.members.push( this.creator );
// 	next();
// });

export default mongoose.model("Project", ProjectSchema);