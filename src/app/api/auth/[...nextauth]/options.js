import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email: ",
          type: "text",
          placeholder: "Your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials) {
        // Find user with matching email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If user exists, compare passwords
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // If passwords match, return user
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } else {
          // If passwords do not match or user does not exist, return null
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      // Add property to token
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (existingUser) {
          token.id = existingUser.id;
        } else {
          // If the user does not exist and the provider is Github
          if (account.provider === "github") {
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
              },
            });

            token.id = newUser.id;
          }
        }
      }
      return token;
    },
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    // brandColor: "", // Hex color code
    // logo: "", // Absolute URL to image
    // buttonText: "", // Hex color code
  },
};
export default NextAuth(authOptions);
