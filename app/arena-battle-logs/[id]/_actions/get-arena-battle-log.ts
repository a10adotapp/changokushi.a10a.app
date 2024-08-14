"use server";

import { client } from "@/lib/db/client";
import { getArenaBattleLog as _getArenaBattleLog, getArenaBattleLogRow } from "@/sqlc/query_sql";

export async function getArenaBattleLog(
  id: number,
): Promise<getArenaBattleLogRow | null> {
  return await _getArenaBattleLog(client(), {
    id,
  });
}
