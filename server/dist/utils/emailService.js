"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transport = nodemailer_1.default.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 5 * 60 * 1000,
    socketTimeout: 5 * 60 * 1000,
    debug: true,
    logger: true
});
const sendEmail = async (dto) => {
    const { sender, recipients, subject, message, data } = dto;
    const htmlMessage = data.htmlMessage;
    return await transport.sendMail({
        from: `${sender.name} <${sender.address}>`,
        to: recipients.map((recipient) => `${recipient.name} <${recipient.address}>`).join(", "),
        subject,
        html: htmlMessage,
        text: message
    });
};
exports.sendEmail = sendEmail;
