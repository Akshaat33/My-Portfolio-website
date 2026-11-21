import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import connectDB from '../config/db.js';
import User from '../models/User.js';

const createAccount = async ({ email, password, role }) => {
const normalizedEmail = email?.trim().toLowerCase();

if (!normalizedEmail || !password) {
throw new Error(`Missing email or password for role: ${role}`);
}

const existingUser = await User.findOne({
email: normalizedEmail,
});

if (existingUser) {
console.log(`${role} account already exists: ${normalizedEmail}`);
return;
}

const hashedPassword = await bcrypt.hash(password, 12);

await User.create({
email: normalizedEmail,
password: hashedPassword,
role,
});

console.log(`${role} account created successfully: ${normalizedEmail}`);
};

const createAccounts = async () => {
try {
await connectDB();

await createAccount({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: "admin",
});
await createAccount({
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
  role: "user",
});
console.log("\nAccount setup completed!");

} catch (error) {
console.error('Account setup failed:', error.message);
process.exitCode = 1;
} finally {
await mongoose.disconnect();
console.log('Database connection closed.');
}
};

createAccounts();