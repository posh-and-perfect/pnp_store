import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import { connectToDatabase } from '@lib/mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (optional)
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Validate username and password against a database or other source
        const db = await connectToDatabase();
        const user = await db.collection('users').findOne({ email: username });

        if (user && (await compare(password, user.password))) {
          // Authentication is successful, return the user object
          return Promise.resolve(user);
        } else {
          // If authentication fails, return null or throw an error
          return Promise.resolve(null);
        }
      },
    }),
    // Add other providers if needed
  ],
  database: process.env.MONGODB_URI,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      if (user) {
        // Add user data to the session
        session.user = user;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    }
  },
  pages: {
    signUp: '/auth/signup',
    signOut: '/auth/signout',
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
});
