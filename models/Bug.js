import mongoose from "mongoose";

/*
	Used as subdocument to ./models/Project.js
*/
const BugSchema = new mongoose.Schema({
	// Descriptors of bug
	title: {
		type: String,
		required: [true, "Please enter a title for the bug"],
		trim: true,
		maxlength: [50, "Title cannot be more than 50 characters"]
	},

	description: {
		type: String,
		required: [true, "Please enter a description of the bug"]
	},

	// Status of bug
	status: {
		type: String,
		required: [true, "Please enter the status of the bug"],
		enum: [
			"INCOMPLETE",
			"IN PROGRESS",
			"COMPLETE"
		]
	},

	archived: {
		type: Boolean,
		default: false
	},

	// Member assigned to fix
	assignedMember: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: null
	},

	// Time stamps
	createdAt: {
		type: Date,
		default: Date.now
	},

	completedAt: {
		type: Date,
		default: undefined
	}
});

export default BugSchema;