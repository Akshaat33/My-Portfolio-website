import express from 'express';

import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    reorderProjects,
} from '../controllers/projectController.js';

import {
    authenticate,
    requireAdmin,
} from '../middleware/authMiddleware.js';

import upload from '../middleware/uploadmiddleware.js';

const router = express.Router();

// Public reading access
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin-only modification access
router.post('/', authenticate, requireAdmin, upload.single("projectimage"), createProject);
router.put('/reorder', authenticate, requireAdmin, reorderProjects);
router.put('/:id', authenticate, requireAdmin, upload.single("projectimage"), updateProject);
router.delete('/:id', authenticate, requireAdmin, deleteProject);

export default router;