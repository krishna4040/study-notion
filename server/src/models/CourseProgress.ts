import { Schema, model, Types } from 'mongoose';

export type courseProgress = {
    _id: Types.ObjectId;
    courseID: Types.ObjectId;
    completedVideos: Types.ObjectId[];
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

export default model("CourseProgress", courseProgressSchema);