import { InferSchemaType, Schema, model } from 'mongoose'

export type ratingAndReview = InferSchemaType<typeof ratingAndReviewSchema>

const ratingAndReviewSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    },
});

export default model("RatingAndReview", ratingAndReviewSchema);