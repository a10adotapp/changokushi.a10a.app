import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { countLikesByUser } from "@/sqlc/query_sql";
import { client } from "@/lib/db/client";
import { today } from "@/lib/datetime/today";
import { tomorrow } from "@/lib/datetime/tomorrow";
import { authOptions } from "@/lib/auth/auth-options";
import { Toaster } from "@/components/ui/toaster"
import { UserContextProvider } from "@/components/user-context-provider";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { CharacterList } from "./_components/character-list";

export const metadata: Metadata = {
  title: "ちゃんごくし推し投票 | a10a.app",
  description: "ちゃんごくし推し投票 | a10a.app",
  openGraph: {
    title: "ちゃんごくし推し投票 | a10a.app",
    description: "ちゃんごくし推し投票 | a10a.app",
  },
  twitter: {
    title: "ちゃんごくし推し投票 | a10a.app",
    description: "ちゃんごくし推し投票 | a10a.app",
    card: "summary",
  },
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  const likesCount = await countLikesByUser(client(), {
    user: session?.user ?? "",
    likedAtGte: today(),
    likedAtLt: tomorrow(),
  });

  return (
    <UserContextProvider defaultValue={{
      hasSignedIn: !!session,
      likeCount: likesCount?.count || 0,
    }}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Navbar />

        <div className="flex flex-col grow py-4 px-2">
          <CharacterList />
        </div>

        <Footer />
      </div>

      <Toaster />
    </UserContextProvider>
  );
}
