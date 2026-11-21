import express from "express";

import { getSkills, addSkillCategory, addSkill, removeSkill, deleteSkillCategory, reorderCategories, } from "../controllers/addskillController.js";

import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getSkills);

// Protected routes
router.post("/categories", authenticate, requireAdmin, addSkillCategory);

router.delete("/categories/:id", authenticate, requireAdmin, deleteSkillCategory);

router.post("/:id", authenticate, requireAdmin, addSkill);

router.delete("/:id", authenticate, requireAdmin, removeSkill);

router.put("/reorder", authenticate, requireAdmin, reorderCategories);

export default router;