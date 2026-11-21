import mongoose from "mongoose";

const skillCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
        default: "",
    },
    order: {
        type: Number,
        default: 0,
    },
    skills: {
        type: [String],
        default: [],
    },

}, { timestamps: true });

const SkillCategory = mongoose.model("SkillCategory", skillCategorySchema);

export default SkillCategory;