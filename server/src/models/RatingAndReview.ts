import { Schema, Types, model } from 'mongoose'

interface RatingAndReview {
    user: Types.ObjectId;
    rating: number;
    review: string;
    course: Types.ObjectId;
}

const ratingAndReviewSchema = new Schema<RatingAndReview>({
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