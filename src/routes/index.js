import express from 'express';
import SendEmail from '../controllers/SendEmail';

const router = express.Router();

router.post('/sendorder', SendEmail.sendEmail);
router.post('/contact', SendEmail.sendInquire);

module.exports = router;
