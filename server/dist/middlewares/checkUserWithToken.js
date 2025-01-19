"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tokens_1 = require("../utils/Tokens");
const User_1 = __importDefault(require("../models/User"));
const extractToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ status: 401, message: "Authorization token required" });
        }
        const token = authHeader.split(" ")[1];
        const details = (0, Tokens_1.verifyToken)(token);
        if (typeof details === "string" || !details || !details.data || !details.data.email) {
            return res.status(401).json({ status: 401, message: "Invalid token" });
        }
        const userExists = await User_1.default.findOne({ email: details.data.email });
        if (!userExists) {
            return res.status(401).json({ status: 401, message: "User not found!" });
        }
        req.user = userExists;
        next();
    }
    catch (error) {
        return res.status(401).json({ status: 401, message: "No valid credentials" });
    }
};
exports.default = extractToken;
