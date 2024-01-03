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

module.exports = model("SubSection", SubSectionSchema);