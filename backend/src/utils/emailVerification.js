const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  

const sendVerificationEmail = (email, token) => {
    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
    const mailOptions = {
        from: '"Gaurang " <tadhanigaurang2@gmail.com>',
        to: email,
        subject: 'Verify your email address',
        html: `
            <p>Dear User,</p>
            <p>Please verify your email by clicking the button below:</p>
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br/>G</p>
        `,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending verification email:', err);
                return reject(err);
            }
            resolve(info);
        });
    });
};

module.exports = sendVerificationEmail
