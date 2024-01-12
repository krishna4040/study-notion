import { Schema, model, Types } from 'mongoose'

export type user = {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType: 'Admin' | 'Student' | 'Instructor';
    active?: boolean;
    approved?: boolean;
    additionalDetails: Types.ObjectId;
    courses?: Types.ObjectId[];
    token?: string;
    resetPasswordExpires?: Date;
    image: string;
    courseProgress?: Types.ObjectId[];
    cart: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
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
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
},
    { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
export default model("User", userSchema);