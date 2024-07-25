import NextAuthGoogleProvider from "next-auth/providers/google";

export function googleProvider() {
  return NextAuthGoogleProvider({
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  });
}
