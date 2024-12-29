"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailWithPDF = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("./config");
const pdfUtils_1 = require("./pdfUtils");
// Set up the SMTP transporter
const transporter1 = nodemailer_1.default.createTransport({
    host: config_1.config.smtpHost,
    port: config_1.config.smtpPort,
    secure: config_1.config.smtpPort === 465, // true for 465, false for other ports
    auth: {
        user: config_1.config.smtpUser,
        pass: config_1.config.smtpPass,
    },
});
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'nazmul.m360ict@gmail.com',
        pass: 'mekejdgumdjfomiy',
    },
});
const sendEmailWithPDF = (to, subject, message, pdfContent) => __awaiter(void 0, void 0, void 0, function* () {
    // Generate PDF content
    const pdfBuffer2 = (yield (0, pdfUtils_1.generatePDF)());
    console.log({ to });
    // Configure email options
    const mailOptions = {
        from: config_1.config.smtpUser,
        to,
        subject,
        text: message,
        attachments: [
            {
                filename: 'document.pdf',
                content: pdfBuffer2,
            },
        ],
    };
    // Send the email
    yield transporter.sendMail(mailOptions);
});
exports.sendEmailWithPDF = sendEmailWithPDF;
