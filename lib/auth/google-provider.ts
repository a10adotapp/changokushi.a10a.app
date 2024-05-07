import NextAuthGoogleProvider from "next-auth/providers/google";
import { env as _env } from "@/lib/env";

const env = _env();

export const googleProvider = NextAuthGoogleProvider({
  clientId: env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
});
