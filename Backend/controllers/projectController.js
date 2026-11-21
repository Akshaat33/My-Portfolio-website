import Project from '../models/Project.js';
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Get all projects
// @route   GET /api/projects
export const getProjects = async (req, res) => {
    try {

        const projects = await Project.aggregate([
            {
                $addFields: {
                    priorityOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$priority", "pinned"] }, then: 1 },
                                { case: { $eq: ["$priority", "featured"] }, then: 2 },
                                { case: { $eq: ["$priority", "normal"] }, then: 3 }
                            ],
                            default: 3
                        }
                    }
                }
            },
            {
                $sort: {
                    priorityOrder: 1,
                    order: 1,
                    createdAt: -1
                }
            },
            {
                $project: {
                    priorityOrder: 0
                }
            }
        ]);
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch projects.',
        });
    }
};

// @desc    Get a single project
// @route   GET /api/projects/:id
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }
        res.status(200).json({
            success: true,
            data: project,
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID.',
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to fetch project.",
        });

    }
};

// @desc    Create a project
// @route   POST /api/projects
export const createProject = async (req, res) => {
    let uploadedImage = null;
    try {
        const {
            title,
            description,
            tags,
            challengesfaced,
            Howitwasbuilt,
            githubUrl,
            liveUrl,
            priority,
            placement,
        } = req.body;
        let tagsArray = [];
        if (typeof tags === "string") {
            tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);
        }
        let challengesArray = [];

        if (typeof challengesfaced === "string") {
            challengesArray = challengesfaced.split(/\r?\n/).map(item => item.trim()).filter(Boolean);
        }
        let builtArray = [];

        if (typeof Howitwasbuilt === "string") {
            builtArray = Howitwasbuilt.split(/\r?\n/).map(item => item.trim()).filter(Boolean);
        }
        let projectimage = '';
        let projectimagePublicId = "";
        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof description !== "string" ||
            !description.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required.",
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Project image is required.",
            });
        }
        uploadedImage = await uploadToCloudinary(req.file.buffer);
        projectimage = uploadedImage.secure_url;
        projectimagePublicId = uploadedImage.public_id;
        const project = await Project.create({
            title,
            description,
            tags: tagsArray,
            challengesfaced: challengesArray,
            Howitwasbuilt: builtArray,
            githubUrl,
            liveUrl,
            priority,
            projectimage,
            projectimagePublicId,
            placement,
        });
        res.status(201).json({
            success: true,
            message: "Project created successfully.",
            data: project,
        });

    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid project data.',
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create project.",
        });

    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
export const updateProject = async (req, res) => {
    let uploadedImage = null;
    let oldImagePublicId = null;
    try {
        const project = await Project.findById(req.params.id,);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }
        if (req.body.title !== undefined) {
            project.title = req.body.title;
        }

        if (req.body.description !== undefined) {
            project.description = req.body.description;
        }
        if (req.body.githubUrl !== undefined) {
            project.githubUrl = req.body.githubUrl;
        }
        if (req.body.liveUrl !== undefined) {
            project.liveUrl = req.body.liveUrl;
        }
        if (req.body.priority !== undefined) {
            project.priority = req.body.priority;
        }
        if (req.body.placement !== undefined) {
            project.placement = req.body.placement;
        }
        if (req.body.tags !== undefined) {
            if (typeof req.body.tags === "string") {
                project.tags = req.body.tags.split(",").map(tag => tag.trim()).filter(Boolean);
            }
        }
        if (req.body.challengesfaced !== undefined) {
            if (typeof req.body.challengesfaced === "string") {
                project.challengesfaced = req.body.challengesfaced.split(/\r?\n/).map(item => item.trim()).filter(Boolean);
            }
        }
        if (req.body.Howitwasbuilt !== undefined) {
            if (typeof req.body.Howitwasbuilt === "string") {
                project.Howitwasbuilt = req.body.Howitwasbuilt.split(/\r?\n/).map(item => item.trim()).filter(Boolean);
            }
        }

        if (req.file) {
            oldImagePublicId = project.projectimagePublicId;
            uploadedImage = await uploadToCloudinary(req.file.buffer);
            project.projectimage = uploadedImage.secure_url;
            project.projectimagePublicId = uploadedImage.public_id;
        }

        await project.save();

        if (uploadedImage && oldImagePublicId) {
            await cloudinary.uploader.destroy(oldImagePublicId);
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully.",
            data: project,
        });

    } catch (error) {
        if (uploadedImage) {
            await cloudinary.uploader.destroy(uploadedImage.public_id);
        }

        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid project data or ID.',
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update project.",
        });

    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }
        await Project.findByIdAndDelete(req.params.id);
        if (project.projectimagePublicId) {
            await cloudinary.uploader.destroy(project.projectimagePublicId);
        }
        res.status(200).json({
            success: true,
            message: "Project deleted successfully.",
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID.',
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete project.",
        });

    }
};
// @desc    Reorder projects
// @route   PUT /api/projects/reorder
export const reorderProjects = async (req, res) => {
    try {
        const { projectIds } = req.body;

        if (!Array.isArray(projectIds)) {
            return res.status(400).json({
                success: false,
                message: "Project IDs must be an array.",
            });
        }

        const uniqueIds = new Set(projectIds);

        if (uniqueIds.size !== projectIds.length) {
            return res.status(400).json({
                success: false,
                message: "Duplicate project IDs are not allowed.",
            });
        }

        const projects = await Project.find({
            _id: { $in: projectIds }
        }).select("_id");

        if (projects.length !== projectIds.length) {
            return res.status(400).json({
                success: false,
                message: "One or more projects were not found.",
            });
        }

        const operations = projectIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order: index } }
            }
        }));

        await Project.bulkWrite(operations);

        res.status(200).json({
            success: true,
            message: "Projects reordered successfully.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to reorder projects.",
        });
    }
};