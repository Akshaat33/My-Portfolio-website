import mongoose from "mongoose";

const certificateschema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        issuedby: {
            type: String,
            required: true,
            trim: true
        },
        year: {
            type: Number,
            required: true
        },
        certificateimg: {
            type: String,
            required: true,
            trim: true
        },
        order: {
            type: Number,
            default: 0,
        },
        certificateimgPublicId: {
            type: String,
            default: ""
        },
        credentiallink: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

const AddCertificate = mongoose.model('AddCertificate', certificateschema);

export default AddCertificate