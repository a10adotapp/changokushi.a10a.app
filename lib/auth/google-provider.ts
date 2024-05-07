import NextAuthGoogleProvider from "next-auth/providers/google";
import { env } from "@/lib/env";

export const googleProvider = NextAuthGoogleProvider({
  clientId: env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
});
