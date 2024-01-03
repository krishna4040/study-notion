import { Schema, Types, model } from 'mongoose';

interface course {
    courseName: string;
    courseDescription: string;
    instructor: Types.ObjectId;
    whatYouWillLearn: string;
    courseContent: Types.ObjectId[];
    ratingAndReviews: Types.ObjectId[];
    price: number;
    thumbnail: string;
    tag: string[];
    category: Types.ObjectId;
    studentsEnrolled: Types.ObjectId[];
    instructions: string[];
    status: 'Draft' | 'Published';
}

const courseSchema = new Schema<course>({
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
});

export default model('Course', courseSchema);