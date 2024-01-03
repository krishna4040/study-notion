import { Request, Response } from 'express'
import { contactUsEmail } from '../mail/contactUsEmail'
import { mailSender } from '../utils/mailSender'

export const contactUs = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone, message, countryCode } = req.body;
        mailSender(email, "Contact us", contactUsEmail(email, firstName, lastName, message, phone, countryCode));
        res.status(200).json({
            success: true,
            message: 'email sent'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'unable to send message'
        });
    }
}