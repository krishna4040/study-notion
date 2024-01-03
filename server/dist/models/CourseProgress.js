"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseProgressSchema = new mongoose_1.Schema({
    courseID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
    },
    completedVideos: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "SubSection",
        }],
});
exports.default = (0, mongoose_1.model)("CourseProgress", courseProgressSchema);
