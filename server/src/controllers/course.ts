import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import Course, { course } from "../models/Course"
import Category from "../models/Category"
import User from "../models/User"
import { uploadImageToCloudinary } from "../utils/imageUploader"
import Section, { section } from '../models/Section'
import SubSection from '../models/SubSection'
import CourseProgress from '../models/CourseProgress'
import { convertSecondsToDuration } from '../utils/secToDuration'
require('dotenv').config();

// Function to create a new course
export const createCourse = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        const thumbnail = req.files?.thumbnail;

        // Check if any of the required fields are missing
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !thumbnail ||
            !category
        ) {
            throw new Error('Invalid req');
        }
        if (!status || status === undefined) {
            status = "Draft";
        }
        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });

        if (!instructorDetails) {
            throw new Error('Instructor details not found');
        }

        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            throw new Error('Category details not found');
        }
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME!);
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });

        await User.findByIdAndUpdate(
            { _id: instructorDetails._id, },
            { $push: { courses: newCourse._id, } },
            { new: true }
        );
        await Category.findByIdAndUpdate(
            { _id: category },
            { $push: { course: newCourse._id } },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const allCourses = await Course.find({}).select('courseName price thumbnail instructor ratingAndReviews studentsEnrolled').populate("instructor").exec();
        return res.status(200).json({
            success: true,
            message: 'All courses fecthed',
            data: allCourses,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCourseDetails = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const userId = req.user?.id;
        const course = await Course.findOne({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: 'additionalDetails'
                },
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate<{ courseContent: section[] }>({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .exec();
        if (!course) {
            throw new Error('Course not found');
        }

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });

        let totalDurationInSeconds = 0;
        course.courseContent.forEach(content => {
            content.subSection.forEach((subSection: any) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            });
        });
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        res.status(200).json({
            success: true,
            message: 'Course details fecthed succesfully',
            data: {
                course,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : []
            }
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.messgae
        });
    }
}

// get course of a instructor
export const getInstructorCourses = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id;
        const allCourses = await Course.find({ instructor: id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'All courses for a logged in instructor fecthed',
            data: allCourses
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const editCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);

        if (!course) {
            throw new Error('course not found');
        }

        if (req.files) {
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME!);
            course.thumbnail = thumbnailImage.secure_url;
        }

        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }
        await course.save()

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: "subSection"
            })
            .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId)
        if (!course) {
            throw new Error('course not found');
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled;
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, { $pull: { courses: courseId } });
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}