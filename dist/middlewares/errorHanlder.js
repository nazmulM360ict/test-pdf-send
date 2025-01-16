"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = require("./appError");
const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof appError_1.AppError ? err.statusCode : 500;
    const message = err instanceof appError_1.AppError ? err.message : 'Internal Server Error';
    const errors = err instanceof appError_1.AppError ? err.errors : undefined;
    console.log(err);
    // Log unexpected errors for debugging purposes
    if (!(err instanceof appError_1.AppError)) {
        console.error('Unexpected Error:', err);
    }
    // Send the response, including validation errors if they exist
    res.status(statusCode).json(Object.assign({ success: false, message }, (errors && { errors })));
};
exports.errorHandler = errorHandler;
