import { Schema, model } from 'mongoose'

interface Profile {
    gender?: string;
    dateOfBirth?: string;
    about?: string;
    contactNumber?: number;
}

const profileSchema = new Schema<Profile>({
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

module.exports = model("Profile", profileSchema);