import { Response, Request } from 'express'
import { instance } from "../config/rzConnect";
import Course from "../models/Course";
import User from "../models/User";
import { mailSender } from "../utils/mailSender";
import { courseEnrollmentEmail } from '../mail/courseEnrollmentEmail';
import mongoose from "mongoose";
require('dotenv').config();
import crypto from 'crypto'

//capture the payment and initiate the Razorpay order
export const capturePayment = async (req: Request, res: Response) => {
    const { course_id } = req.body;
    const userId = req.user?.id;
    if (!course_id) {
        throw new Error('Invalid req');
    }

    let course;
    try {
        course = await Course.findById(course_id);
        if (!course) {
            throw new Error('Course not found');
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            throw new Error('Student already enrolled');
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

    // create order using razorpay instance.orders.create
    try {
        const paymentResponse = await instance.orders.create({
            amount: course.price * 100,
            currency: 'INR',
            receipt: Math.random().toString(),
            notes: {
                courseId: course_id,
                userId: userId
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Transaction completed',
            data: {
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            }
        });
    }
    catch (error: any) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

//verify Signature of Razorpay and Server
// This controller is hit by razorpay not by frontend
export const verifySignature = async (req: Request, res: Response) => {
    const webhookSecret = process.env.WEB_HOOOK_SECRET; // server-secret
    const signature = req.headers["x-razorpay-signature"]; // razorpay-secret // this is hashed data

    const shasum = crypto.createHmac("sha256", webhookSecret!); // hashing our server-secret with same algo // hmac: algo+secret==>hashkey
    shasum.update(JSON.stringify(req.body)); // convert shasum to string format
    const digest = shasum.digest("hex"); // op of hashing is known as digest which is generally in hexa form

    if (signature === digest) {
        console.log("Payment is Authorised");
        const { courseId, userId } = req.body.payload.payment.entity.notes;
        try {
            //fulfil the action
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate({ _id: courseId }, { $push: { studentsEnrolled: userId } }, { new: true });
            if (!enrolledCourse) {
                throw new Error('Course not found');
            }

            //find the student and add the course to their list enrolled courses me 
            const enrolledStudent = await User.findOneAndUpdate({ _id: userId }, { $push: { courses: courseId } }, { new: true });

            //mail send krdo confirmation wala
            const emailResponse = await mailSender(enrolledStudent?.email!, "Congratulations from CodeHelp", courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent?.firstName!));

            return res.status(200).json({
                success: true,
                message: "Signature Verified and Course Added",
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid request',
        });
    }
};