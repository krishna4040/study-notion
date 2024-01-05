import { Schema, model, InferSchemaType } from 'mongoose'

export type section = InferSchemaType<typeof sectionSchema>

const sectionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    sectionName: {
        type: String,
    },
    subSection: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "SubSection",
    }],
});

export default model("Section", sectionSchema);