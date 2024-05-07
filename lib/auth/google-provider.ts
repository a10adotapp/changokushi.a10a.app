import { z } from "zod";
import NextAuthGoogleProvider from "next-auth/providers/google";

export const dynamic = "force-dynamic";

export function googleProvider() {
  const env = z.object({
    GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
  }).parse({
    GOOGLE_OAUTH_CLIENT_ID: "GOOGLE_OAUTH_CLIENT_ID",
    GOOGLE_OAUTH_CLIENT_SECRET: "GOOGLE_OAUTH_CLIENT_SECRET",
    ...process.env,
  });

  return NextAuthGoogleProvider({
    clientId: env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
  });
}
