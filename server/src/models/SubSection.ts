import { Schema, Types, model } from 'mongoose'

interface subSection {
    title: string,
    timeDuration: String,
    description: String,
    videoUrl: String
}

const SubSectionSchema = new Schema<subSection>({
    title: String,
    timeDuration: String,
    description: String,
    videoUrl: String,
});

export default model("SubSection", SubSectionSchema);