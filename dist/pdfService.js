"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDFBuffer = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const generatePDFBuffer = (content) => {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit_1.default();
        const buffers = [];
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', (error) => reject(error));
        doc.text(content);
        doc.end();
    });
};
exports.generatePDFBuffer = generatePDFBuffer;
