import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers/credentials";
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
          const user = User.findOne({ email });

          if (!user) {
            return null;
          }

          const comparedPassword = await bcrypt.compare(
            password,
            user.password
          );

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
});

export { handler as GET, handler as POST };
