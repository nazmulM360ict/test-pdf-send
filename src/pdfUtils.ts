import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export const generatePDF = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load HTML file
  const htmlPath = path.resolve(__dirname, 'template.html');

  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Generate PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true, // Include background colors
  });

  await browser.close();
  return pdfBuffer;
};

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
