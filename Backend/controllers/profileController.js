import UpdateProfile from "../models/updateprofile.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

export const getProfile = async (req, res) => {

    try {
        const profile = await UpdateProfile.findOne({
            profileKey: "main"
        });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }
        return res.status(200).json({
            success: true,
            profile
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
            error: error.message
        });
    }
};

export const saveProfile = async (req, res) => {
    let uploadedImage = null;
    try {
        const { name, tagline } = req.body;
        const existingProfile = await UpdateProfile.findOne({
            profileKey: "main"
        });
        let profilepic = existingProfile?.profilepic || "";
        let profilepicPublicId = existingProfile?.profilepicPublicId || "";
        if (req.file) {
            uploadedImage = await uploadToCloudinary(req.file.buffer);
            profilepic = uploadedImage.secure_url;
            profilepicPublicId = uploadedImage.public_id;
        }
        if (!profilepic) {
            return res.status(400).json({
                success: false,
                message: "Please upload a profile picture"
            });
        }
        if (!name?.trim() || !tagline?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name and tagline are required"
            });
        }
        const profile = await UpdateProfile.findOneAndUpdate(
            { profileKey: "main" },
            {
                $set: {
                    name: name.trim(),
                    tagline: tagline.trim(),
                    profilepic,
                    profilepicPublicId
                }
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            }

        )
        if (
            req.file &&
            existingProfile?.profilepicPublicId &&
            existingProfile.profilepicPublicId !== profilepicPublicId
        ) {
            try {
                await cloudinary.uploader.destroy(
                    existingProfile.profilepicPublicId
                );
            } catch (deleteError) {
                console.error("Old image deletion failed:", deleteError);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Profile saved successfully",
            profile
        });
    } catch (error) {
        if (uploadedImage?.public_id) {
            try {
                await cloudinary.uploader.destroy(uploadedImage.public_id);
            } catch (deleteError) {
                console.error("New image cleanup failed:", deleteError);
            }
        }
        return res.status(500).json({
            success: false,
            message: "Failed to save profile",
            error: error.message
        });
    }
}