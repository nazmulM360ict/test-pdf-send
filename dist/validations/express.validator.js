"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const express_validator_1 = require("express-validator");
exports.userValidationSchema = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];
