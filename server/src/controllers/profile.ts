import { Request, Response } from 'express'
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
require('dotenv').config();

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber } = req.body;
        const id = req.user?.id;

        const userDetails = await User.findById(id);
        const profile = await Profile.findByIdAndUpdate(userDetails?.additionalDetails!, {
            dateOfBirth,
            about,
            contactNumber
        }, { new: true });

        return res.json({
            success: true,
            message: "Profile updated successfully",
            data: profile,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id;
        const user = await User.findById({ _id: id });
        if (!user) {
            throw new Error('user not found');
        }

        await Profile.findByIdAndDelete({ _id: user.additionalDetails });
        // TODO: Unenroll User From All the Enrolled Courses
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllUserDetails = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id;
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();
        res.status(200).json({
            success: true,
            data: userDetails,
            message: "User Data fetched successfully"
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//updateDisplayPicture
export const updateDisplayPicture = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id;
        if (!id) {
            throw new Error('Invalid req');
        }
        const profilePicture = req.files?.dp;
        const upload = uploadImageToCloudinary(profilePicture, process.env.FOLDER_NAME!);
        await User.findByIdAndUpdate(id, { image: (await upload).secure_url });
        res.status(200).json({
            success: true,
            message: 'Profile pic updated successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// getEnrolledCourses
export const getEnrolledCourses = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id;
        if (!id) {
            throw new Error('Invalid request');
        }
        const user = await User.findById(id).populate("courses").exec();
        res.status(200).json({
            success: true,
            message: 'enrolled courses fecth successfull',
            data: user?.courses
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}