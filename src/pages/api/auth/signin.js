import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { connectToDatabase } from '@lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT signing

    try {
      // Connect to the MongoDB database
      const db = await connectToDatabase();

      // Check if the user exists in the "users" collection
      const user = await db.collection('users').findOne({ email });
      if (!user) {
        // User not found, return an error
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password from the database
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        // Passwords do not match, return an error
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate a JWT token for the authenticated user
      const tokenPayload = user;

      const token = sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

      // Send the token to the client
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during signin:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
