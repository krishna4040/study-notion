import { Schema, model, Types } from 'mongoose';

export type courseProgress = {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    completedVideos: Types.ObjectId[];
}

const courseProgressSchema = new Schema<courseProgress>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    completedVideos: [{
        type: Schema.Types.ObjectId,
        ref: "SubSection",
    }],
});

export default model("CourseProgress", courseProgressSchema);