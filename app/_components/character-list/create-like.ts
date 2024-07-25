"use server";

import { authOptions } from "@/lib/auth/auth-options";
import { today } from "@/lib/datetime/today";
import { tomorrow } from "@/lib/datetime/tomorrow";
import { client } from "@/lib/db/client";
import { createLike as _createLike, countLikesByUser } from "@/sqlc/query_sql";
import { getServerSession } from "next-auth";

export async function createLike(characterId: number) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("投票するためにはログインしてください");
  }

  const likesCount = await countLikesByUser(client(), {
    user: session?.user ?? "",
    likedAtGte: today(),
    likedAtLt: tomorrow(),
  })

  if (!likesCount || (likesCount.count >= 3)) {
    throw new Error("本日の投票可能数を超えています。");
  }

  return await _createLike(client(), {
    characterId,
    user: session.user,
  });
}
