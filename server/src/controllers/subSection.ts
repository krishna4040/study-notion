import { Request, Response } from 'express'
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import { uploadBuffer } from "../utils/bufferUploader.js";
require('dotenv').config();

export const createSubSection = async (req: Request, res: Response) => {
    try {
        const { sectionId, title, timeDuration, description, videoUrl } = req.body;

        console.log(req.files);

        if (!sectionId || !title || !timeDuration || !description || !videoUrl) {
            throw new Error('Invalid req');
        }

        const video = await uploadBuffer(videoUrl);

        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: video,
        });

        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId }, { $push: { subSection: SubSectionDetails._id } }, { new: true }).populate("subSection");

        res.status(200).json({
            success: true,
            data: updatedSection
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateSubSection = async (req: Request, res: Response) => {
    try {
        const { subSectionId, title, timeDuration, description } = req.body;
        const video = req.files?.videoFile;
        if (!(subSectionId || title || !timeDuration || !description || !video)) {
            throw new Error("invalid req");
        }
        await SubSection.findByIdAndUpdate({ id: subSectionId }, { title, timeDuration, description, video }, { new: true });
        const section = await Section.find({ subSection: subSectionId });
        res.status(200).json({
            success: true,
            data: section,
            message: 'subsection updated'
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteSubSection = async (req: Request, res: Response) => {
    try {
        const { subSectionId } = req.body;
        if (!subSectionId) {
            throw new Error('Invalid req');
        }
        await SubSection.findByIdAndDelete({ id: subSectionId });
        const section = await Section.findOneAndDelete({ subSection: subSectionId }, { new: true });
        res.status(200).json({
            success: true,
            data: section,
            message: 'sub section deleted succsesfully'
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}