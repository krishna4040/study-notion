import { Schema, Types, model } from 'mongoose'

export type category = {
    _id: Types.ObjectId;
    name: string;
    description: string;
    courses: Types.ObjectId[];
}

const categorySchema = new Schema<category>({
    name: {
        type: String,
        required: true,
    },
    description: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
    }],
});

export default model("Category", categorySchema);