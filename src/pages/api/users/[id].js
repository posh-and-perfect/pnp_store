// pages/api/users/[id].js

import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {

  const DEV_API_KEY = process.env.DEV_API_KEY;

  const {
    query: { id, APIKey },
    method,
    body: { name, email },
  } = req;

  if (APIKey !== DEV_API_KEY) {
    res.status(401).json({ error: "Unauthorized Request." })
  }

  const db = await connectToDatabase();
  const collection = db.collection('users');

  switch (method) {
    case 'PUT':
      try {
        await collection.updateOne(
          { _id: id },
          { $set: { name, email } }
        );
        res.status(200).json({ message: 'User updated successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
