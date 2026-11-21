import About from '../models/adminandmore.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';
import cloudinary from '../config/cloudinary.js';

// GET ABOUT DATA
const getAbout = async (req, res) => {

    try {
        const about = await About.findOne({ aboutKey: 'main' });

        if (!about) {
            return res.status(404).json({
                success: false,
                message: 'About information not found'
            });
        }
        res.status(200).json({
            success: true,
            data: about
        });
    } catch (error) {
        console.error('Get About Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch About information'
        });
    }

};

// UPDATE ABOUT DATA
const updateAbout = async (req, res) => {
    let uploadedCV = null;
    try {
        if (req.file) {
            uploadedCV = await uploadToCloudinary(
                req.file.buffer,
                'portfolio/cv',
                'raw'
            );
        }
        const {
            aboutText,
            education,
            learningNow,
            links
        } = req.body;
        const updateData = {};
        const parsedAboutText = aboutText ? JSON.parse(aboutText) : undefined;
        const parsedEducation = education ? JSON.parse(education) : undefined;
        const parsedLearningNow = learningNow ? JSON.parse(learningNow) : undefined;
        const parsedLinks = links ? JSON.parse(links) : undefined;

        if (parsedAboutText !== undefined) updateData.aboutText = parsedAboutText;
        if (parsedEducation !== undefined) updateData.education = parsedEducation;
        if (parsedLearningNow !== undefined) updateData.learningNow = parsedLearningNow;
        if (parsedLinks !== undefined) updateData.links = parsedLinks;

        if (uploadedCV) {
            updateData.cv = {
                url: uploadedCV.secure_url,
                publicId: uploadedCV.public_id
            };
        }
        const existingAbout = await About.findOne({ aboutKey: 'main' });
        const about = await About.findOneAndUpdate(
            { aboutKey: 'main' },
            {
                $set: updateData
            },
            {
                new: true,
                runValidators: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );
        if (
            uploadedCV &&
            existingAbout?.cv?.publicId &&
            existingAbout.cv.publicId !== uploadedCV.public_id
        ) {
            await cloudinary.uploader.destroy(existingAbout.cv.publicId, {
                resource_type: 'raw'
            });
        }
        res.status(200).json({
            success: true,
            message: 'About information updated successfully',
            data: about
        });
    } catch (error) {
        console.error('Update About Error:', error);
        if (uploadedCV?.public_id) {
            try {
                await cloudinary.uploader.destroy(uploadedCV.public_id, {
                    resource_type: 'raw'
                });
            } catch (cleanupError) {
                console.error('New CV cleanup failed:', cleanupError);
            }
        }
        res.status(500).json({
            success: false,
            message: 'Failed to update About information'
        });
    }

};

export {
    getAbout,
    updateAbout
};