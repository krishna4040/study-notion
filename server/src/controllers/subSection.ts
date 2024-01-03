import { Request, Response } from 'express'
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
require('dotenv').config();

export const createSubSection = async (req: Request, res: Response) => {
    try {
        const { sectionId, title, timeDuration, description } = req.body;
        const video = req.files?.videoFile;
        if (!sectionId || !title || !timeDuration || !description || !video) {
            throw new Error('Invalid req');
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME!);

        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId }, { $push: { subSection: SubSectionDetails._id } }, { new: true }).populate("subSection");

        return res.status(200).json({ success: true, data: updatedSection });
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
            res.status(400).json({
                success: false,
                message: 'enter at least one field to update'
            });
        }
        await SubSection.findByIdAndUpdate({ id: subSectionId }, { title, timeDuration, description, video }, { new: true });
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
        await Section.findOneAndDelete({ subSection: subSectionId });
        res.status(200).json({
            success: true,
            message: 'sub section deleted succsesfully'
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}