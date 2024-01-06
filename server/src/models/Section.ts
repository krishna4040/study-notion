import { Schema, model, Types } from 'mongoose'

export type section = {
    _id: Types.ObjectId;
    sectionName: string;
    subSection: Types.ObjectId[];
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