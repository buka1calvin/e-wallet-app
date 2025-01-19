"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomError = void 0;
const createCustomError = (name, message, status = 500) => {
    const error = new Error(message);
    error.name = name;
    error.status = status;
    return error;
};
exports.createCustomError = createCustomError;
