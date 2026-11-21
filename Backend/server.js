import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import projectRoutes from './routes/projectRoutes.js'
import authRoutes from "./routes/authRoutes.js";
import updateprofileRoutes from './routes/updateprofileRoutes.js'
import addcertificateRoutes from './routes/addcertificateRoutes.js'
import skillRoutes from "./routes/addskillsRoutes.js";
import aboutRoutes from './routes/aboutandmoreRoutes.js';
import contactRoutes from './routes/ContactRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
    })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile",updateprofileRoutes)
app.use("/api/addcertificates",addcertificateRoutes)
app.use("/api/addskills", skillRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Personal Portfolio API is running!",
    });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Personal Portfolio API running on port ${PORT}`);
        });
    }catch(error){
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
}

startServer();