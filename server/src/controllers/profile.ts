import { Request, Response } from 'express'
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import { course } from '../models/Course.js';
import { section } from '../models/Section.js';
import { convertSecondsToDuration } from '../utils/secToDuration.js'
import CourseProgress from '../models/CourseProgress.js';
import { subSection } from '../models/SubSection.js';
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
        const userId = req.user?.id;
        const userDetails = await User.findOne({ _id: userId, })
            .populate<{ courses: course[] }>({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: "subSection"
                }
            })
            .exec();

        const enrolledCourses: course[] = userDetails?.courses!;
        for (let i = 0; i < enrolledCourses.length; i++) {

            let totalDurationInSeconds = 0, SubsectionLength = 0;
            const courseContent: any = enrolledCourses[i].courseContent; // coursecontent is a Array<section> objectid

            for (let j = 0; j < courseContent.length; j++) {
                const section: section = courseContent[j];
                totalDurationInSeconds += section.subSection.reduce((acc: number, curr: subSection) => acc + parseInt(curr.timeDuration!), 0)
                enrolledCourses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                SubsectionLength += courseContent[j].subSection.length
            }

            const courseProgressCount = await CourseProgress.findOne({
                courseID: enrolledCourses[i]._id,
                userId: userId,
            });
            const completedVideos = courseProgressCount?.completedVideos.length; // completed subsections

            if (SubsectionLength === 0) {
                enrolledCourses[i].progressPercentage = 100;
            } else {
                const multiplier = Math.pow(10, 2);
                enrolledCourses[i].progressPercentage = Math.round((completedVideos! / SubsectionLength) * 100 * multiplier) / multiplier
            }
        }
        return res.status(200).json({
            success: true,
            data: userDetails?.courses,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}