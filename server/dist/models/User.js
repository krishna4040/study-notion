"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    courses: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Course",
        }],
    token: String,
    resetPasswordExpires: Date,
    image: {
        type: String,
        required: true,
    },
    courseProgress: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "CourseProgress",
        }],
}, { timestamps: true });
// Export the Mongoose model for the user schema, using the name "user"
exports.default = (0, mongoose_1.model)("User", userSchema);
