import { InferSchemaType, Schema, model } from 'mongoose'

export type subSection = InferSchemaType<typeof SubSectionSchema>

const SubSectionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    timeDuration: String,
    description: String,
    videoUrl: String,
});

export default model("SubSection", SubSectionSchema);