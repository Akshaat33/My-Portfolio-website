import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
  try {
    // 1. Get email and password from the request
    const { email, password } = req.body;

    // 2. Validate the input
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }
    // 3. Find the account in MongoDB
    const user = await User.findOne({email: email.trim().toLowerCase(),});
    // 4. Check the password against its stored hash
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    // 5. Ensure the JWT secret exists
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is missing from .env");
      return res.status(500).json({
        success: false,
        message: "Authentication is not configured correctly.",
      });
    }
    // 6. Create a signed login token
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "2h" }
    );
    // 7. Send the token and safe account details
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Login error:', error.message);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during login.",
    });

  }
};