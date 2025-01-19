"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const userExist = async (req, res, next) => {
    try {
        const exists = await User_1.default.findOne({ email: req.body.email });
        if (exists) {
            console.log(exists);
            return res.status(400).json({ status: false, error: "email already exist!" });
        }
        req.user = exists;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = userExist;
