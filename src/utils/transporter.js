const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = require("../config/envs");

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

module.exports = transporter;