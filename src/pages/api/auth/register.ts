import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs'; // Or bcrypt if compatible
import dbConnect from '@/utils/dbConnect'; // Use your utility for MongoDB connection
import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  dateOfBirth: Date,
  createdAt: { type: Date, default: Date.now },
});

// Create the user model (reuse existing model if already compiled)
const User = mongoose.models.User || mongoose.model('User', userSchema);

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, password, phone, dateOfBirth } = req.body;

  // Validate request body
  if (!firstName || !lastName || !email || !password || !phone || !dateOfBirth) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Connect to MongoDB
    await dbConnect();

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default registerHandler;

