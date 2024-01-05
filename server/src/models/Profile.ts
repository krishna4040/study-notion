import { InferSchemaType, Schema, model } from 'mongoose'

export type profile = InferSchemaType<typeof profileSchema>

const profileSchema = new Schema({
    _id: Schema.Types.ObjectId,
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
});

export default model("Profile", profileSchema);