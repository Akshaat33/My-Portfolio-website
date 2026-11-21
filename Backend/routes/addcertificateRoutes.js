import express from "express";
import { getCertificate,addCertificate,deletecertificate,reorderCertificates } from "../controllers/addCertificateController.js";
import { authenticate,requireAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadmiddleware.js";

const router = express.Router();

router.get('/',getCertificate);

router.post('/',authenticate,requireAdmin,upload.single("certificateimg"),addCertificate);
router.put("/reorder", authenticate, requireAdmin, reorderCertificates);
router.delete('/:id',authenticate,requireAdmin,deletecertificate);

export default router;