import { Request, Response } from 'express'
import CourseProgress from '../models/CourseProgress';


export const updateCourseProgress = async (req: Request, res: Response) => {
    try {
        const { courseId, subSectionId } = req.body;
        const userId = req.user?.id;

        const courseProgress = await CourseProgress.findOne({
            courseId,
            userId
        });
        if (!courseProgress) {
            throw new Error('No course progress found for the course and user');
        }
        if (courseProgress.completedVideos.includes(subSectionId)) {
            throw new Error('Subsection already completed');
        }
        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();

        res.status(200).json({
            success: true,
            message: "course progress updated successfully"
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}