import nodemailer from 'nodemailer';
import { config } from './config';
import { generatePDF } from './pdfUtils';

// Set up the SMTP transporter
const transporter1 = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: config.smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nazmul.m360ict@gmail.com',
    pass: 'mekejdgumdjfomiy',
  },
});

export const sendEmailWithPDF = async (
  to: string,
  subject: string,
  message: string,
  pdfContent: string
): Promise<void> => {
  // Generate PDF content
  const pdfBuffer2 = (await generatePDF()) as any;

  // Configure email options
  const mailOptions = {
    from: config.smtpUser,
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
  await transporter.sendMail(mailOptions);
};
