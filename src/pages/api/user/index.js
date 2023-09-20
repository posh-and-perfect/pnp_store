import { getSession } from "next-auth/react";
import { connectToDatabase } from "@lib/mongodb";

export default async function handler(req, res) {
  try {
    // Get the user session
    const session = await getSession({ req });

    // Ensure the user is authenticated
    if (!session) {
      return res.status(401).json({ error: "Unauthorized. User not authenticated." });
    }

    // Get the user's email from the session
    const userEmail = session.user.email;

    // Connect to the MongoDB database
    const db = await connectToDatabase();

    // Get the "users" collection from the database
    const usersCollection = db.collection("users");

    // Find the user with the provided email
    const user = await usersCollection.findOne({ email: userEmail });

    // Ensure the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Return the user data
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "An error occurred while fetching the user." });
  }
}
