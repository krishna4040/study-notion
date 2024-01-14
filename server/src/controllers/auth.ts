import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { passwordUpdated } from "../mail/passwordUpdate";
import { mailSender } from "../utils/mailSender";
import OTP from "../models/OTP";
import User from '../models/User'
import Profile from "../models/Profile";
require("dotenv").config();

export const signup = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            throw new Error("Invalid request");
        }

        if (password !== confirmPassword) {
            throw new Error("password and confirm password do not macth");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists. Please sign in to continue.")
        }

        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        if (response.length === 0 || otp !== response[0].otp) {
            throw new Error("otp invalid or not sent");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let approved: String | boolean = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}&chars=1`,
        });

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Invalid request");
        }

        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {
            throw new Error("user not registered");
        }

        const comp: Boolean = await bcrypt.compare(password, user.password!);
        if (comp) {
            const token = jwt.sign(
                { email: user.email, id: user._id, accountType: user.accountType },
                process.env.JWT_SECRET!,
                { expiresIn: "24h" }
            );

            user.token = token;
            // user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                data: user,
                message: 'User Login Success',
            });
        } else {
            throw new Error("Invalid password");
        }
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const sendotp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            throw new Error('user already registered');
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }
        const otpBody = await OTP.create({
            email,
            otp
        });
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const userDetails = await User.findById(req.user?.id);
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails?.password!);
        if (!isPasswordMatch) {
            throw new Error('Invalid password');
        }
        if (newPassword !== confirmNewPassword) {
            throw new Error('password and confirm password do not macth');
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(req.user?.id, { password: encryptedPassword }, { new: true });
        const emailResponse = await mailSender(updatedUserDetails?.email!, 'Password Reset', passwordUpdated(updatedUserDetails?.email!, `Password updated successfully for ${updatedUserDetails?.firstName} ${updatedUserDetails?.lastName}`));

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};