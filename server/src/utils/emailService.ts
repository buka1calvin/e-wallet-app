import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from 'dotenv';
dotenv.config();

const transport = nodemailer.createTransport({
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
} as SMTPTransport.Options);

export const sendEmail = async (dto:any) => {
    const { sender, recipients, subject, message,data } = dto;

    const htmlMessage =data.htmlMessage;

    return await transport.sendMail({
        from: `${sender.name} <${sender.address}>`,
        to: recipients.map((recipient:any) => `${recipient.name} <${recipient.address}>`).join(", "),
        subject,
        html: htmlMessage,
        text: message 
    });
};