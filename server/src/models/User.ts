import { Schema, Types, model } from 'mongoose'

interface user {
    firstName: string,
    lastName: string,
    email: string,
    password: string | undefined,
    accountType: String,
    active: boolean,
    approved: boolean,
    additionalDetails: Types.ObjectId,
    courses: [Types.ObjectId],
    token: String,
    resetPasswordExpires: Date,
    image: String,
    courseProgress: [Types.ObjectId],
}

const userSchema = new Schema<user>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        accountType: {
            type: String,
            enum: ["Admin", "Student", "Instructor"],
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        approved: {
            type: Boolean,
            default: true,
        },
        additionalDetails: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Profile",
        },
        courses: [{
            type: Schema.Types.ObjectId,
            ref: "Course",
        }],
        token: String,
        resetPasswordExpires: Date,
        image: {
            type: String,
            required: true,
        },
        courseProgress: [{
            type: Schema.Types.ObjectId,
            ref: "CourseProgress",
        }],
    },
    { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
export default model("User", userSchema);