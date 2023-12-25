import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/user";
const bcrypt = require("bcrypt");

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      // process login
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await dbConnect();
          const user = await User.findOne({ email });

          console.log(user);

          if (!user) {
            return null;
          }

          const comparedPassword = await bcrypt.compare(
            password,
            user.password
          );

          console.log(comparedPassword);

          if (!comparedPassword) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error.message);
        }
        return true;
      },
    }),
  ],
  callbacks: {},
  session: {
    strategy: "jwt",
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
    maxAge: 1 * 60, // 1 minute
  },
  pages: {
    signIn: "localhost:3000/login",
  },
});

export { handler as GET, handler as POST };
