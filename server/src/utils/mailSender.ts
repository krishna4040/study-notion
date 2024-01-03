import nodemailer from 'nodemailer'
require('dotenv').config();

export const mailSender = async (email: string, title: string, body: string) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from: 'StudyNotion || CodeHelp - by Babbar',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        return info;
    }
    catch (error: any) {
        console.log(error.message);
    }
}