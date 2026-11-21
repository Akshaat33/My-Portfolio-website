import express from "express";
import { getProfile,saveProfile } from "../controllers/profileController.js";
import { authenticate,requireAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadmiddleware.js";

const router = express.Router();

router.get('/', getProfile);

router.post('/',authenticate,requireAdmin,upload.single("profilepic"),saveProfile);
router.put('/',authenticate,requireAdmin,upload.single("profilepic"),saveProfile);

export default router;