import { InferSchemaType, Schema, model } from 'mongoose';

export type scourseProgress = InferSchemaType<typeof courseProgressSchema>

const courseProgressSchema = new Schema({
    _id: Schema.Types.ObjectId,
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