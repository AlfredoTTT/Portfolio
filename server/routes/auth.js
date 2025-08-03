const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Token = require('../models/Token');
const router = express.Router();

// Configure Nodemailer (replace with your email service credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint to request a token
router.post('/request-token', async (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString('hex');
    
    try {
        await Token.create({ email, token });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Access Token for Portfolio',
            text: `Your access token is: ${token}`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).send('Token sent to email');
    } catch (error) {
        res.status(500).send('Error sending token');
    }
});

// Endpoint to verify token
router.post('/verify-token', async (req, res) => {
    const { email, token } = req.body;
    try {
        const validToken = await Token.findOne({ email, token });
        if (validToken) {
            res.status(200).send('Token verified');
        } else {
            res.status(401).send('Invalid token');
        }
    } catch (error) {
        res.status(500).send('Error verifying token');
    }
});

module.exports = router;