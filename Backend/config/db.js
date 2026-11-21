import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MONGO_URI is missing from your .env file.");
        }
        const connection = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB connected successfully!");
        console.log(`Host: ${connection.connection.host}`);
        console.log(`Database: ${connection.connection.name}`);
        console.log(`Port: ${connection.connection.port}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;