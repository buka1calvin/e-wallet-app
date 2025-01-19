"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyToken = exports.generateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (data, options) => {
    const token = jsonwebtoken_1.default.sign({ data }, process.env.JWT_SECRET, options);
    return token;
};
exports.generateToken = generateToken;
const generateRefreshToken = (data, options) => {
    const token = jsonwebtoken_1.default.sign({ data }, process.env.JWT_REFRESH_SECRET, options);
    return token;
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token) => {
    try {
        const obj = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return obj;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const verifyRefreshToken = (token) => {
    try {
        const obj = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        return obj;
    }
    catch (error) {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
