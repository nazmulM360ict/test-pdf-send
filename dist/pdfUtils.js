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
exports.generatePDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generatePDF = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    // Load HTML file
    const htmlPath = path_1.default.resolve(__dirname, 'template.html');
    const htmlContent = fs_1.default.readFileSync(htmlPath, 'utf-8');
    yield page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    // Generate PDF
    const pdfBuffer = yield page.pdf({
        format: 'A4',
        printBackground: true, // Include background colors
    });
    yield browser.close();
    return pdfBuffer;
});
exports.generatePDF = generatePDF;
const htmlTemp = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Booking</title>
  <style>
  /* Reset some default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Basic body styling */
body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Container to hold the content */
.container {
  width: 100%;
  max-width: 800px;
  padding: 20px;
}

/* Main confirmation box */
.confirmation-box {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 15px;
}

.confirmation-message {
  font-size: 18px;
  text-align: center;
  margin-bottom: 25px;
  color: #4CAF50;
}

.booking-details {
  margin-bottom: 30px;
}

.section-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.booking-details p {
  font-size: 16px;
  margin: 8px 0;
}

/* Action buttons */
.actions {
  display: flex;
  justify-content: space-between;
}

.action-btn {
  padding: 12px 25px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 48%;
  transition: background-color 0.3s ease;
}

.confirm-btn {
  background-color: #4CAF50;
  color: white;
}

.confirm-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.cancel-btn:hover {
  background-color: #e53935;
}

    
  </style>
</head>
<body>
  <div class="container">
    <div class="confirmation-box">
      <h1 class="title">Booking Confirmation</h1>
      <p class="confirmation-message">Your booking has been successfully confirmed!</p>
      
      <div class="booking-details">
        <h2 class="section-title">Booking Details</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Booking ID:</strong> #ABC12345</p>
        <p><strong>Room Type:</strong> Deluxe Suite</p>
        <p><strong>Check-in:</strong> 2024-12-30</p>
        <p><strong>Check-out:</strong> 2025-01-05</p>
        <p><strong>Total Amount:</strong> $1200</p>
      </div>

      <div class="actions">
        <button class="action-btn confirm-btn">Go to Dashboard</button>
        <button class="action-btn cancel-btn">Cancel Booking</button>
      </div>
    </div>
  </div>
</body>
</html>
`;
