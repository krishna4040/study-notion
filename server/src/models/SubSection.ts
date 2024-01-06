import { Schema, Types, model } from 'mongoose'

export type subSection = {
    _id: Types.ObjectId;
    title: string;
    timeDuration: string;
    description: string;
    videoUrl: string;
}

const SubSectionSchema = new Schema<subSection>({
    title: String,
    timeDuration: String,
    description: String,
    videoUrl: String,
});

export default model("SubSection", SubSectionSchema);