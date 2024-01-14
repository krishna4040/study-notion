import { Request, Response } from 'express'
import RatingAndReview from '../models/RatingAndReview.js';
import Course from '../models/Course.js';
import mongoose from 'mongoose';

export const createRating = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { rating, review, courseId } = req.body;

        const course = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMacth: { $eq: userId } }
        });

        if (!course) {
            throw new Error('Student not enrolled in the course');
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });
        if (alreadyReviewed) {
            throw new Error('Course already reviewed');
        }

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId
        });

        await Course.findByIdAndUpdate({ _id: courseId }, { $push: { ratingAndReviews: ratingReview._id } }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Rating and review successfully added'
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAverageRating = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating",
                    }
                }
            },
        ]);

        // return rating
        if (result.length) {
            return res.status(200).json({
                success: false,
                data: result[0].averageRating
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Average Rating 0 no rating given yet'
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllRatingReview = async (req: Request, res: Response) => {
    try {
        const allReviews = await RatingAndReview.find({}).sort({ rating: 'desc' })
            .populate({
                path: "user",
                select: 'firstName lastName email image'
            })
            .populate({
                path: 'course',
                select: 'courseName'
            })
            .exec();

        res.status(200).json({
            success: false,
            message: 'All reviews fetched successfully',
            data: allReviews
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'smth went wrong while getting all rating'
        });
    }
}