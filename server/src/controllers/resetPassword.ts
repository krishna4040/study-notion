import { Request, Response } from 'express'
import User from "../models/User.js";
import { mailSender } from "../utils/mailSender.js";
import { passwordUpdated } from '../mail/passwordUpdate.js';
import bcrypt from "bcrypt";
import crypto from 'crypto';
require('dotenv').config();

export const resetPasswordToken = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error(`user with email ${email} is not registered with us`);
        }
        const token = crypto.randomBytes(20).toString("hex");
        const updatedDetails = await User.findOneAndUpdate({ email: email }, { token: token, resetPasswordExpires: Date.now() + 3600000, }, { new: true });

        const url = `${process.env.UPDATE_PASSWORD_URL}/${token}`;

        await mailSender(email, "Password Reset", `Your Link for email verification is ${url} Please click this url to reset your password.`);

        res.status(200).json({
            success: true,
            message: "Email Sent Successfully, Please Check Your Email to Continue Further",
        });
    } catch (error: any) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (confirmPassword !== password) {
            throw new ErrorEvent("Password and Confirm Password Does not Match");
        }
        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            throw new Error('Invalid token');
        }
        if (!(userDetails?.resetPasswordExpires ?? 0 > Date.now())) {
            throw new Error('Token expired');
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ token: token }, { password: encryptedPassword }, { new: true });
        await mailSender(userDetails.email, 'Password Reset succsesfull', passwordUpdated(userDetails.email, userDetails.firstName));
        res.json({
            success: true,
            message: `Password Reset Successful`,
        });
    } catch (error: any) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};