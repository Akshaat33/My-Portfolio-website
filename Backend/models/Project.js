import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        challengesfaced: {
            type: [String],
            default: [],
        },
        Howitwasbuilt: {
            type: [String],
            default: [],
        },
        tags: {
            type: [String],
            default: [],
        },
        projectimage: {
            type: String,
            default: "",
        },
        projectimagePublicId: {
            type: String,
            default: ""
        },
        githubUrl: {
            type: String,
            default: "",
        },
        liveUrl: {
            type: String,
            default: "",
        },
        priority: {
            type: String,
            enum: ["pinned", "featured", "normal"],
            default: "normal"
        },
        order: {
            type: Number,
            default: 0
        },
        placement: {
            type: String,
            enum: ["top", "bottom"],
            default: "top"
        }
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;