"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    courseName: String,
    courseDescription: String,
    instructor: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    whatYouWillLearn: String,
    courseContent: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Section',
        }],
    ratingAndReviews: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'RatingAndReview',
        }],
    price: Number,
    thumbnail: String,
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    studentsEnrolled: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }],
    instructions: [String],
    status: {
        type: String,
        enum: ['Draft', 'Published'],
    },
    sold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Course', courseSchema);
