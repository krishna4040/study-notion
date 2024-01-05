import { Schema, model, InferSchemaType } from 'mongoose'

export type user = InferSchemaType<typeof userSchema>

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
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