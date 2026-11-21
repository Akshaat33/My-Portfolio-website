import express from 'express';

import {
    createMessage,
    getMessages,
    deleteMessage
} from '../controllers/ContactController.js';

import {
    authenticate,
    requireAdmin
} from '../middleware/authMiddleware.js';

const router = express.Router();

// PUBLIC: Anyone can submit a contact message
router.post('/', createMessage);

// PROTECTED: Only authenticated admin can fetch messages
router.get('/', authenticate, requireAdmin, getMessages);

// PROTECTED: Only authenticated admin can delete messages
router.delete('/:id', authenticate, requireAdmin, deleteMessage);

export default router;