import { Schema, model } from 'mongoose'
import { mailSender } from "../utils/mailSender"
import emailTemplate  "../mail/emailVerificationTemplate"

interface OTP {
    email: String,
    otp: String,
    createdAt: Date
}

const OTPSchema = new Schema<OTP>({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
});

async function sendVerificationEmail(email: String, otp: String) {
    try {
        await mailSender(email, "Verification Email", emailTemplate(otp));
    } catch (error) {
        console.log(error);
    }
}

OTPSchema.pre("save", async function (next) {
    if (this?.isNew) {
        await sendVerificationEmail(this?.email, this?.otp);
    }
    next();
});

export default model("OTP", OTPSchema);