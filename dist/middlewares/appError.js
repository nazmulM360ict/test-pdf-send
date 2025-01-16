"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        // Ensure correct prototype chain
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
    }
}
exports.AppError = AppError;
