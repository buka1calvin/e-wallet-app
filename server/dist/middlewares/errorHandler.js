"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
};
exports.errorHandler = errorHandler;
