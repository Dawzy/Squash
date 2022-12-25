import User from "../models/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const register = (req, res) => {
	res.send("Registered!");
}

const login = (req, res) => {
	res.send("Login!");
}

export { register, login };