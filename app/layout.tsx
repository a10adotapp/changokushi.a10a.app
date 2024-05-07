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
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Changokushi | a10a.app",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const likesCount = await countLikesByUser(client(), {
    user: session?.user ?? "",
    likedAtGte: today(),
    likedAtLt: tomorrow(),
  });

  return (
    <html>
      <body>
        <UserContextProvider defaultValue={{
          likeCount: likesCount?.count || 0,
        }}>
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Navbar />

            <div className="flex flex-col py-4 px-2">
              {children}
            </div>

            <Footer />
          </div>

          <Toaster />
        </UserContextProvider>
      </body>
    </html>
  );
}
