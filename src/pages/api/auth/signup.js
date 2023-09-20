import { hash } from 'bcryptjs';
import { connectToDatabase } from '@lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, address, password } = req.body;

    try {
      // Connect to the MongoDB database
      const db = await connectToDatabase();

      // Check if the username is already taken
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        // Username is already taken
        return res.status(400).json({ message: 'Username is already taken' });
      }

      // Hash the password before storing it in the database
      const hashedPassword = await hash(password, 10);

      // Store the user in the "users" collection
      const result = await db.collection('users').insertOne({
        name,
        avatar: "/assets/images/profile.jpg",
        email,
        password: hashedPassword,
        phone,
        address,
        creditCards: [],
        orders: [],
        cart: [],
        wishlist: []
      });

      if (result.insertedId) {
        // Successful sign-up
        res.status(200).json({ message: 'User created successfully' });
      } else {
        // Failed to create the user
        res.status(500).json({ message: 'Failed to create the user' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
