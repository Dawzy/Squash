import mongoose from "mongoose";
import bcyprt from "bcrypt";

const UserSchema = new mongoose.Schema({
	// First Name
	// Last Name
	// Email
	// Password
	// List of projects
});

export default mongoose.model("User", UserSchema);