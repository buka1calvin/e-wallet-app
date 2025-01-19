"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("../utils/bcrypt"));
const registerUserService = async (data) => {
    const { firstName, lastName, email, telephone, password } = data;
    const newUser = await User_1.default.create({
        firstName,
        lastName,
        email,
        telephone,
        password: bcrypt_1.default.hash(password),
    });
    return newUser;
};
exports.registerUserService = registerUserService;
const loginUserService = async (data) => {
    const { email, password } = data;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or Password!");
    }
    const isPasswordValid = bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password.");
    }
    return user;
};
exports.loginUserService = loginUserService;
