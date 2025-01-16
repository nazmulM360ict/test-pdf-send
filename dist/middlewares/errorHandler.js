"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        // Ensure the name is the same as the class name
        Object.setPrototypeOf(this, new.target.prototype);
        // Capture stack trace
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
