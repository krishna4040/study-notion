import { Schema, model } from 'mongoose'

export type profile = {
    _id: Schema.Types.ObjectId;
    gender?: string;
    dateOfBirth?: string;
    about?: string;
    contactNumber?: number;
}


const profileSchema = new Schema<profile>({
    gender: {
        type: String,
        enum: ['Male', 'Female']
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