import { Schema, Types, model } from 'mongoose';

interface courseProgress {
    courseID: Types.ObjectId,
    completedVideos: Types.ObjectId[]
}

const courseProgressSchema = new Schema<courseProgress>({
    courseID: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    completedVideos: [{
        type: Schema.Types.ObjectId,
        ref: "SubSection",
    }],
});

module.exports = model("CourseProgress", courseProgressSchema);