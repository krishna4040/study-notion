"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ratingAndReviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    },
});
exports.default = (0, mongoose_1.model)("RatingAndReview", ratingAndReviewSchema);
