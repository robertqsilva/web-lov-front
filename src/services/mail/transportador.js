const nodemailer = require("nodemailer");
require("dotenv").config();

const transportador = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587, 
  auth: {
    user: process.env.MAILJET_API_KEY,
    pass: process.env.MAILJET_SECRET_KEY,
  },
});

module.exports = transportador;
