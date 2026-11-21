import Certificate from "../models/addcertificate.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

export const getCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.find().sort({order:1, createdAt: -1 });
        res.status(200).json({
            success: true,
            count: certificate.length,
            data: certificate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch certificates.',
        });
    }
}

export const addCertificate = async (req, res) => {
    let uploadedImage = null;
    try {
        const { title, issuedby, year, credentiallink } = req.body;
        let certificateimg = '';
        let certificateimgPublicId = "";
        const certificateYear = Number(year);
        if (typeof title !== 'string' || !title.trim() || typeof issuedby !== 'string' || !issuedby.trim() || !Number.isInteger(certificateYear)) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required.",
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Certificate image is required.",
            });
        }
        if (req.file) {
            uploadedImage = await uploadToCloudinary(req.file.buffer);
            certificateimg = uploadedImage.secure_url;
            certificateimgPublicId = uploadedImage.public_id;
        }
        const certificate = await Certificate.create({ title, issuedby, year: certificateYear, certificateimg, certificateimgPublicId, credentiallink })
        res.status(201).json({
            success: true,
            message: "Certificate Added successfully.",
            data: certificate,
        });
    } catch (error) {
        if (uploadedImage?.public_id) {
            try {
                await cloudinary.uploader.destroy(uploadedImage.public_id);
            } catch (cleanupError) {
                console.error("Failed to clean up uploaded certificate image:", cleanupError);
            }
        }
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid certificate data.',
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to add certificate.",
        });
    }
}


export const deletecertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found.",
            });
        }
        await Certificate.findByIdAndDelete(req.params.id);
        if (certificate.certificateimgPublicId) {
            await cloudinary.uploader.destroy(certificate.certificateimgPublicId);
        }
        res.status(200).json({
            success: true,
            message: "Certificate deleted successfully.",
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid certificate ID.',
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete certificate.",
        });
    }
}

export const reorderCertificates = async (req, res) => {
    try {
        const { certificateIds } = req.body;

        if (!Array.isArray(certificateIds)) {
            return res.status(400).json({
                success: false,
                message: "Certificate IDs must be an array.",
            });
        }

        const certificates = await Certificate.find({
            _id: { $in: certificateIds },
        });

        if (
            certificates.length !== certificateIds.length ||
            new Set(certificateIds.map(String)).size !== certificateIds.length
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or duplicate certificate IDs.",
            });
        }

        const updates = certificateIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order: index } },
            },
        }));

        await Certificate.bulkWrite(updates);

        res.status(200).json({
            success: true,
            message: "Certificates reordered successfully.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to reorder certificates.",
        });
    }
};