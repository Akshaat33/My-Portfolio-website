import SkillCategory from "../models/addskills.js";

// @desc Get all skill categories
// @route GET /api/skills
export const getSkills = async (req, res) => {
    try {
        const categories = await SkillCategory.find().sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch skills.",
        });
    }
};


// @desc Add a new category
// @route POST /api/skills/categories
export const addSkillCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required.",
            });
        }

        const existingCategory = await SkillCategory.findOne({
            name: name.trim(),
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Category already exists.",
            });
        }

        const category = await SkillCategory.create({
            name: name.trim(),
            description: description || "",
        });

        res.status(201).json({
            success: true,
            message: "Category added successfully.",
            data: category,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add category.",
        });
    }
};


// @desc Add a skill to an existing category
// @route POST /api/skills/:id
export const addSkill = async (req, res) => {
    try {
        const { skill } = req.body;

        if (typeof skill !== "string" || !skill.trim()) {
            return res.status(400).json({
                success: false,
                message: "Skill name is required.",
            });
        }

        const category = await SkillCategory.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        const skillExists = category.skills.some(
            item => item.toLowerCase() === skill.trim().toLowerCase()
        );

        if (skillExists) {
            return res.status(409).json({
                success: false,
                message: "Skill already exists in this category.",
            });
        }

        category.skills.push(skill.trim());

        await category.save();

        res.status(201).json({
            success: true,
            message: "Skill added successfully.",
            data: category,
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID.",
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to add skill.",
        });
    }
};


// @desc Remove a skill from a category
// @route DELETE /api/skills/:id
export const removeSkill = async (req, res) => {
    try {
        const { skill } = req.body;

        if (typeof skill !== "string" || !skill.trim()) {
            return res.status(400).json({
                success: false,
                message: "Skill name is required.",
            });
        }

        const category = await SkillCategory.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        const skillIndex = category.skills.findIndex(
            item => item.toLowerCase() === skill.trim().toLowerCase()
        );

        if (skillIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Skill not found.",
            });
        }

        category.skills.splice(skillIndex, 1);

        await category.save();

        res.status(200).json({
            success: true,
            message: "Skill removed successfully.",
            data: category,
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID.",
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to remove skill.",
        });
    }
};


// @desc Delete an entire category
// @route DELETE /api/skills/categories/:id
export const deleteSkillCategory = async (req, res) => {
    try {
        const category = await SkillCategory.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        await SkillCategory.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Category deleted successfully.",
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID.",
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete category.",
        });
    }
};


// @desc Reorder categories
// @route PUT /api/skills/reorder
export const reorderCategories = async (req, res) => {
    try {
        const { categoryIds } = req.body;

        if (!Array.isArray(categoryIds)) {
            return res.status(400).json({
                success: false,
                message: "Category IDs must be an array.",
            });
        }

        const categories = await SkillCategory.find({
            _id: { $in: categoryIds },
        });

        if (
            categories.length !== categoryIds.length ||
            new Set(categoryIds.map(String)).size !== categoryIds.length
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or duplicate category IDs.",
            });
        }

        const updates = categoryIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order: index } },
            },
        }));

        await SkillCategory.bulkWrite(updates);

        res.status(200).json({
            success: true,
            message: "Categories reordered successfully.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to reorder categories.",
        });
    }
};