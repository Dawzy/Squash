import mongoose from "mongoose";

mongoose.set("strictQuery", false); // Avoid warnings

const connectDB = async () => {
	// Get connection promise
	// DB_URI already loaded from .coonfig() in server.js
	const connection = await mongoose.connect(process.env.DB_URI, {
		// Avoid console warnings
		useNewUrlParser: true
	});

	// Logging success
	console.log(`MongoDB Connected: ${connection.connection.host}`);
}

export default connectDB;