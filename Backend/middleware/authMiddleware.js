import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is missing from .env");
      return res.status(500).json({
        success: false,
        message: "Authentication is not configured correctly.",
      });
    }
    const decoded = jwt.verify(token, jwtSecret);
    // Confirm the account still exists and has the same role.
    const user = await User.findById(decoded.userId).select("_id email role");
    if (!user || user.role !== decoded.role) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication credentials.",
      });
    }
    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    next();

  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please log in again.',
      });
    }

    console.error("Authentication error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Authentication failed due to a server error.",
    });

  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin permissions are required.',
    });
  }

  next();
}