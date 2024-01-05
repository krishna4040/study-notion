import { InferSchemaType, Schema, model } from 'mongoose'

export type category = InferSchemaType<typeof categorySchema>

const categorySchema = new Schema({
    _id: Schema.Types.ObjectId,
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