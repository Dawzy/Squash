// Imports
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db/db.js";

// Load routers
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";

// Environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialization
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

// Mount routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);

// Entry
const server = app.listen(
	PORT,
	console.log(`Running in ${process.env.NODE_ENV} on port: ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	// Log error that crashed app
	console.log(err);

	// Close server and exit process on unhandled rejections
	server.close( () => process.exit(1) );
});