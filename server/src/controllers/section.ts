import { Request, Response } from 'express'
import Section from "../models/Section"
import Course from "../models/Course"

export const createSection = async (req: Request, res: Response) => {
    try {
        const { sectionName, courseId } = req.body;
        if (!sectionName || !courseId) {
            throw new Error('Invalid req');
        }

        const newSection = await Section.create({ sectionName });
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { $push: { courseContent: newSection._id, } }, { new: true })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        res.status(200).json({
            success: true,
            message: "Section created successfully",
            data: updatedCourse,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateSection = async (req: Request, res: Response) => {
    try {
        const { sectionName, sectionId } = req.body;
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'section updated successfully',
            data: section
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteSection = async (req: Request, res: Response) => {
    try {
        const { sectionId } = req.params;
        await Section.findByIdAndDelete(sectionId);
        res.status(200).json({
            success: true,
            message: "Section deleted",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};