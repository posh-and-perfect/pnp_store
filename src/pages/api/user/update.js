import { connectToDatabase } from "@lib/mongodb";

export default async function handler(req, res) {
  try {
    // Get the CSRF token from the request cookie
    const csrfTokenValue = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("next-auth.csrf-token"))
      .split("=")[1];

    // Ensure the CSRF token is valid
    if (!csrfTokenValue) {
      return res.status(401).json({ error: "Unauthorized. CSRF token missing or invalid." });
    }

    // Ensure the request has a valid user email to update
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Bad Request. Missing required fields." });
    }

    // Connect to the MongoDB database
    const db = await connectToDatabase();

    // Get the "users" collection from the database
    const usersCollection = db.collection("users");

    // Find the user with the provided email
    const user = await usersCollection.findOne({ email });

    // Ensure the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user's profile with the data from the request body
    const { name, phone, address } = req.body;
    
    const updatedUser = {
      ...user,
      name: name || user.name,
      phone: phone || user.phone,
      address: address || user.address,
    };

    // Update the user in the database
    const result = await usersCollection.updateOne({ email }, { $set: updatedUser });

    // Check if the update was successful
    if (result.modifiedCount == 1) {
      // Return the updated user data
      return res.status(200).json({ user: updatedUser });
    }

    // else return the error message
    return res.status(500).json({ error: "Failed to update user." });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "An error occurred while updating the user." });
  }
}
