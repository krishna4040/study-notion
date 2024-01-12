import { Response, Request } from 'express'
import { instance } from "../config/rzConnect";
import Course from "../models/Course";
import User from "../models/User";
import { mailSender } from "../utils/mailSender";
import { courseEnrollmentEmail } from '../mail/courseEnrollmentEmail';
import mongoose from "mongoose";
require('dotenv').config();
import crypto from 'crypto'

export const capturePayment = async (req: Request, res: Response) => {
    try {
        const { courses }: { courses: string[] } = req.body;
        const userId = req.user?.id;
        if (courses.length === 0) {
            throw new Error('Invalid req');
        }
        let totalAmount = 0;
        courses.forEach(async courseId => {
            const course = await Course.findById(courseId);
            if (!course) {
                throw new Error('Course not found');
            }
            if (course.studentsEnrolled.includes(userId)) {
                throw new Error('Already enrolled');
            }
            totalAmount += course.price;
        });

        const paymentRes = await instance.orders.create({
            amount: totalAmount * 100,
            currency: 'INR',
            receipt: Date.now().toString(),
        });

        res.status(200).json({
            success: true,
            message: 'payment captured',
            data: paymentRes
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifySignature = async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
        const userId = req.user?.id;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses) {
            throw new Error('Payment failed');
        }
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha356", process.env.RAZORPAY_SECRET!).update(body.toString()).digest("hex");

        if (expectedSignature === razorpay_signature) {
            courses.forEach(async (courseId: string) => {
                const course = await Course.findByIdAndUpdate(courseId, { $push: { studentsEnrolled: userId } }, { new: true });
                if (!course) {
                    throw new Error('Course not found');
                }
                const user = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true });
                const emailRes = await mailSender(
                    user?.email!,
                    `Successfully Enrolled into ${course.courseName}`,
                    courseEnrollmentEmail(course.courseName, `${user?.firstName}`)
                )
            });
            res.status(200).json({
                success: true,
                message: 'Payment Verified'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const sendPaymentSuccessEmail = async (req: Request, res: Response) => {
    try {
        const { orderId, paymentId, amount } = req.body;
        const userId = req.user?.id;
        if (!orderId || !paymentId || !amount) {
            throw new Error('Invalid req');
        }
        const student = await User.findById(userId);
        await mailSender(student?.email!, 'Payment success', 'email');
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.body;
        const userId = req.user?.id;
        const user = await User.findByIdAndUpdate(userId, { $push: { cart: courseId } }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Course added to cart',
            data: user
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.body;
        const userId = req.user?.id;
        const user = await User.findByIdAndUpdate(userId, { $pull: { cart: courseId } }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Course removed from cart',
            data: user
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}