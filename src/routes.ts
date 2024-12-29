import { Router } from 'express';
import { sendEmailWithPDF } from './emailService';

const router = Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, message, pdfContent } = req.body;

  try {
    await sendEmailWithPDF(to, subject, message, pdfContent);
    res
      .status(200)
      .json({ success: true, message: 'Email with PDF sent successfully!' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to send email with PDF' });
  }
});

export default router;
