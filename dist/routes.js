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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailService_1 = require("./emailService");
const router = (0, express_1.Router)();
router.post('/send-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, message, pdfContent } = req.body;
    try {
        yield (0, emailService_1.sendEmailWithPDF)(to, subject, message, pdfContent);
        res
            .status(200)
            .json({ success: true, message: 'Email with PDF sent successfully!' });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, message: 'Failed to send email with PDF' });
    }
}));
exports.default = router;
