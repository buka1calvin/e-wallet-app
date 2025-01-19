"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.userUpdate = exports.loginUser = exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
const Tokens_1 = require("../utils/Tokens");
const bcrypt_1 = __importDefault(require("../utils/bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, telephone, password } = req.body;
        const userData = {
            firstName,
            lastName,
            email,
            telephone,
            password
        };
        const userExist = await User_1.default.findOne({ email });
        if (userExist) {
            return res.status(403).json({ message: "user Email Already Exists!" });
        }
        const response = await (0, user_service_1.registerUserService)(userData);
        const token = (0, Tokens_1.generateToken)(userData, { expiresIn: "10min" });
        return res.status(201).json({
            user: response,
            message: "User Registered successfully !",
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await (0, user_service_1.loginUserService)({ email, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const userToken = {
            _id: user.id,
            firstName: user.firstName,
            email: user.email,
            role: user.role,
        };
        const accessToken = (0, Tokens_1.generateToken)(userToken, { expiresIn: "2days" });
        const refreshToken = (0, Tokens_1.generateRefreshToken)(userToken, { expiresIn: "7days" });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        return res.status(200).json({
            user: user,
            token: accessToken,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
const userUpdate = async (req, res) => {
    try {
        const user = req.user;
        const updateData = req.body;
        if (updateData.password) {
            updateData.password = bcrypt_1.default.hash(updateData.password);
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(user?._id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found!" });
        }
        return res.status(200).json({
            user: updatedUser,
            message: "User updated successfully!",
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error!" });
    }
};
exports.userUpdate = userUpdate;
const getUser = async (req, res) => {
    try {
        const userId = req.user?._id;
        const user = await User_1.default.findById(userId).select('-password');
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getUser = getUser;
