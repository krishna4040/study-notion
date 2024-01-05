import { InferSchemaType, Schema, model } from 'mongoose';

export type course = InferSchemaType<typeof courseSchema>

const courseSchema = new Schema({
    _id: Schema.Types.ObjectId,
    courseName: String,
    courseDescription: String,
    instructor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    whatYouWillLearn: String,
    courseContent: [{
        type: Schema.Types.ObjectId,
        ref: 'Section',
    }],
    ratingAndReviews: [{
        type: Schema.Types.ObjectId,
        ref: 'RatingAndReview',
    }],
    price: Number,
    thumbnail: String,
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    studentsEnrolled: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    instructions: [String],
    status: {
        type: String,
        enum: ['Draft', 'Published'],
    },
    sold: Number,
    totalDuration: String,
    progressPercentage: Number
});

export default model('Course', courseSchema);