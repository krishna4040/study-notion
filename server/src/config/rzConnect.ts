import Razorpay from 'razorpay'
require('dotenv').config();

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY!,
    key_secret: process.env.RAZORPAY_SECRET,
});