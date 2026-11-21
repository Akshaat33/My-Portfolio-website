import mongoose from "mongoose";

const updateprofileschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        tagline: {
            type: String,
            required: true,
            trim: true
        },
        profilepic: {
            type: String,
            required: true,
            trim: true
        },
        profilepicPublicId: {
            type: String,
            default: ""
        },
        profileKey: {
            type: String,
            unique: true,
            default: "main"
        },
    },
    {
        timestamps: true,
    }
)

const UpdateProfile = mongoose.model('UpdateProfile', updateprofileschema);

export default UpdateProfile