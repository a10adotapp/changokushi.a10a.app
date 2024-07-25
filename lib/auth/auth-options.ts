import { AuthOptions } from "next-auth";
import { googleProvider } from "./google-provider";

export const authOptions: AuthOptions = {
  providers: [
    googleProvider(),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user = token.sub;
      }

      return session;
    },
  },
};
