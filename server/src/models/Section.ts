import { Schema, model, Types } from 'mongoose'

interface section {
    sectionName: String,
    subSection: Array<Types.ObjectId>
}

const sectionSchema = new Schema<section>({
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