import { Request, Response } from 'express'
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import Course, { course } from '../models/Course.js';
import { section } from '../models/Section.js';
import CourseProgress from '../models/CourseProgress.js';
import { UploadedFile } from 'express-fileupload';
require('dotenv').config();

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        const id = req.user?.id;

        const userDetails = await User.findById(id);
        const profile = await Profile.findByIdAndUpdate(userDetails?.additionalDetails!, {
            dateOfBirth,
            about,
            contactNumber,
            gender
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
        const user = await User.findById(id);
        if (!user) {
            throw new Error('user not found');
        }

        await Profile.findByIdAndDelete(user.additionalDetails);

        const enrolledCourses = user.courses;
        for (let i = 0; i < enrolledCourses.length; i++) {
            const courseId = enrolledCourses[i];
            await Course.findByIdAndUpdate(courseId, { $pull: { studentsEnrolled: id } });
        }

        await User.findByIdAndDelete(id);

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
        const upload = uploadImageToCloudinary(profilePicture as UploadedFile, process.env.FOLDER_NAME!);
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
        const userId = req.user?.id;
        const user = await User.findById(userId)
            .populate<{ courses: course[] }>({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: "subSection"
                }
            })
            .exec();

        const enrolledCourses = user?.courses;
        let subSectionLength = 0, progressPercentage = 0;

        enrolledCourses?.forEach(async c => {
            const course = await Course.findById(c._id).populate<{ courseContent: section[] }>({ path: 'courseContent', populate: 'subSection' });

            const courseProgressCount = await CourseProgress.findOne({
                courseId: course?.id,
                userId: userId,
            });
            const completedVideos = courseProgressCount?.completedVideos.length;
            if (subSectionLength === 0) {
                progressPercentage = 100;
            } else {
                const multiplier = Math.pow(10, 2);
                progressPercentage = Math.round((completedVideos! / subSectionLength) * 100 * multiplier) / multiplier;
            }

        });

        return res.status(200).json({
            success: true,
            data: {
                enrolledCourses,
                progressPercentage
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}