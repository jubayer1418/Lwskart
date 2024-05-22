import NextAuth, { AuthError, CredentialsSignin } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import clientPromise from "@/db/mongoClientPromise";
import { Customer } from "@/model";

import Facebook from "next-auth/providers/facebook";
import { dbConnect } from "./server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if (!email || !password) {
          throw new CredentialsSignin({
            cause: "Please provider both email and password",
          });
        }

        const user = await Customer.findOne({
          email: credentials.email,
        }).select("+password");
       
        if (!user) {
          throw new CredentialsSignin({ cause: "User Not Found!" });
        }
        const isMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isMatch) {
          throw new CredentialsSignin({ cause: "Invalid Email or Password" });
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),

    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
    
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
    
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          const { email, name, image, id } = user;
        
          await dbConnect();
          const alreadyUser = await Customer.findOne({ email }).exec();

          if (!alreadyUser) {
            if (account.provider === "google") {
              await Customer.create({
                email,
                name,
                image,
                googleId: id,
              });
            } else if (account.provider === "facebook") {
              await Customer.create({
                email,
                name,
                image,
                facebookId: id,
              });
            }
          }
          return true;
        } catch (error) {
          throw new AuthError("Error creating user");
        }
      }
      return false;
    },
  },
});
