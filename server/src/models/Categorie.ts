import { Schema, Types, model } from 'mongoose'

interface category {
    name: String,
    description: String,
    courses: [Types.ObjectId]
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

module.exports = model("Category", categorySchema);