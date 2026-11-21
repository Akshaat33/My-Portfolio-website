import express from 'express';
import upload from '../middleware/uploadmiddleware.js';
import {
    getAbout,
    updateAbout
} from '../controllers/aboutController.js';

import {
    authenticate,
    requireAdmin
} from '../middleware/authMiddleware.js';

const router = express.Router();

// PUBLIC: Fetch About information
router.get('/', getAbout);

// PROTECTED: Update About information
router.put('/', authenticate, requireAdmin, upload.single('cv'), updateAbout);

export default router;