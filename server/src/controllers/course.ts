import { Request, Response } from 'express'
import Course from "../models/Course"
import Category from "../models/Category"
import User from "../models/User"
import { uploadImageToCloudinary } from "../utils/imageUploader"
import Section, { section } from '../models/Section'
import SubSection from '../models/SubSection'
import { UploadedFile } from 'express-fileupload'
require('dotenv').config();

// Function to create a new course
export const createCourse = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        let { courseName, courseDescription, whatYouWillLearn, price, tag, categoryId, status, instructions } = req.body;
        const { courseImage } = req.files!;

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !courseImage || !categoryId) {
            throw new Error('Invalid req');
        }
        if (!status || status === undefined) {
            status = "Draft";
        }

        const categoryDetails = await Category.findById(categoryId);
        if (!categoryDetails) {
            throw new Error('Category details not found');
        }
        const thumbnail = (await uploadImageToCloudinary(courseImage as UploadedFile, process.env.FOLDER!)).secure_url;

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: userId,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail,
            status: status,
            instructions: instructions,
        });

        await User.findByIdAndUpdate({ _id: userId, }, { $push: { courses: newCourse._id, } });
        await Category.findByIdAndUpdate(categoryId, { $push: { courses: newCourse._id } });

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
        console.log(error);
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const allCourses = await Course.find({}).select('courseName price thumbnail instructor ratingAndReviews studentsEnrolled').populate("instructor").exec();
        return res.status(200).json({
            success: true,
            message: 'All courses fetched',
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
        const course = await Course.findById(courseId)
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

        res.status(200).json({
            success: true,
            message: 'Course details fetched successfully',
            data: course
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        console.log(error);
    }
}

// get course of a instructor
export const getInstructorCourses = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id;
        const allCourses = await Course.find({ instructor: id }).sort({ createdAt: -1 })
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
        res.status(200).json({
            success: true,
            message: 'All courses for a logged in instructor fetched',
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
        const {
            courseId,
            courseName = "",
            courseDescription = "",
            whatYouWillLearn = "",
            price = 0,
            tag = "",
            categoryId = "",
            status = "",
            instructions = ""
        } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('course not found');
        }

        if (req.files) {
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail as UploadedFile, process.env.FOLDER_NAME!);
            course.thumbnail = thumbnailImage.secure_url;
        }

        if (courseName) course.courseName = courseName;
        if (courseDescription) course.courseDescription = courseDescription;
        if (whatYouWillLearn) course.whatYouWillLearn = whatYouWillLearn;
        if (price) course.price = price;
        if (tag) course.tag = tag;
        if (categoryId) course.category = categoryId;
        if (status) course.status = status;
        if (instructions) course.instructions = instructions;

        await course.save();

        const updatedCourse = await Course.findOne({ _id: courseId })
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
            .exec();

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