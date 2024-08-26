// src/index.js

const express = require('express');
const EmailService = require('./EmailService');

const app = express();
const emailService = new EmailService();

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const email = req.body;
  await emailService.sendEmail(email);
  res.send('Email process initiated.');
});

app.get('/statuses', (req, res) => {
  res.json(emailService.getStatuses());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});
