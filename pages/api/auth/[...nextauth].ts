import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getMembers } from "../emails";

export const authOptions = {
  secret: process.env.NextAuth_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const members = await getMembers();
      if (members.some((m) => m.email === user.email)) {
        return true;
      } 
      else {
        return false;
      }
    },
  }
}

export default NextAuth(authOptions);
