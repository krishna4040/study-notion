import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import Course from "../models/Course"
import Category from "../models/Category"
import User from "../models/User"
// const Section = require('../models/Section');
// const Section = require('../models/SubSection');
import { uploadImageToCloudinary } from "../utils/imageUploader"
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
        const course = await Course.find({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: 'additionalDetails'
                },
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
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
            message: 'fecthed all courses',
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'smth went wrong while fecthing all courses'
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

// Edit Course Details
// exports.editCourse = async (req, res) => {
// 	try {
// 		const { courseId } = req.body
// 		const updates = req.body
// 		const course = await Course.findById(courseId)

// 		if (!course) {
// 			return res.status(404).json({ error: "Course not found" })
// 		}

// 		// If Thumbnail Image is found, update it
// 		if (req.files) {
// 			console.log("thumbnail update")
// 			const thumbnail = req.files.thumbnailImage
// 			const thumbnailImage = await uploadImageToCloudinary(
// 				thumbnail,
// 				process.env.FOLDER_NAME
// 			)
// 			course.thumbnail = thumbnailImage.secure_url
// 		}

// 		// Update only the fields that are present in the request body
// 		for (const key in updates) {
// 			if (updates.hasOwnProperty(key)) {
// 				if (key === "tag" || key === "instructions") {
// 					course[key] = JSON.parse(updates[key])
// 				} else {
// 					course[key] = updates[key]
// 				}
// 			}
// 		}

// 		await course.save()

// 		const updatedCourse = await Course.findOne({
// 			_id: courseId,
// 		})
// 			.populate({
// 				path: "instructor",
// 				populate: {
// 					path: "additionalDetails",
// 				},
// 			})
// 			.populate("category")
// 			.populate("ratingAndReviews")
// 			.populate({
// 				path: "courseContent",
// 				populate: {
// 					path: "subSection",
// 				},
// 			})
// 			.exec()

// 		res.json({
// 			success: true,
// 			message: "Course updated successfully",
// 			data: updatedCourse,
// 		})
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 			error: error.message,
// 		})
// 	}
// }

// // Delete the Course
// exports.deleteCourse = async (req, res) => {
// 	try {
// 		const { courseId } = req.body

// 		// Find the course
// 		const course = await Course.findById(courseId)
// 		if (!course) {
// 			return res.status(404).json({ message: "Course not found" })
// 		}

// 		// Unenroll students from the course
// 		const studentsEnrolled = course.studentsEnroled
// 		for (const studentId of studentsEnrolled) {
// 			await User.findByIdAndUpdate(studentId, {
// 				$pull: { courses: courseId },
// 			})
// 		}

// 		// Delete sections and sub-sections
// 		const courseSections = course.courseContent
// 		for (const sectionId of courseSections) {
// 			// Delete sub-sections of the section
// 			const section = await Section.findById(sectionId)
// 			if (section) {
// 				const subSections = section.subSection
// 				for (const subSectionId of subSections) {
// 					await SubSection.findByIdAndDelete(subSectionId)
// 				}
// 			}

// 			// Delete the section
// 			await Section.findByIdAndDelete(sectionId)
// 		}

// 		// Delete the course
// 		await Course.findByIdAndDelete(courseId)

// 		return res.status(200).json({
// 			success: true,
// 			message: "Course deleted successfully",
// 		})
// 	} catch (error) {
// 		console.error(error)
// 		return res.status(500).json({
// 			success: false,
// 			message: "Server error",
// 			error: error.message,
// 		})
// 	}
// }
