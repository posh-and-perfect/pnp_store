// pages/api/users.js

import { connectToDatabase } from "src/lib/mongodb";


export default async function handler(req, res) {

    const DEV_API_KEY = process.env.DEV_API_KEY;

    const { query: { APIKey } } = req;
    
    if (APIKey !== DEV_API_KEY) {
        res.status(401).json({ error: "Unauthorized Request." });
    }

    if (req.method === 'GET') {
        try {
            const db = await connectToDatabase();
            const collection = db.collection('users');
            const users = await collection.find({}).toArray();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error_message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}