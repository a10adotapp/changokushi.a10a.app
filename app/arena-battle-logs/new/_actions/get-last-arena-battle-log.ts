"use server";

import { client } from "@/lib/db/client";
import { getLastArenaBattleLog as _getLastArenaBattleLog, getLastArenaBattleLogRow } from "@/sqlc/query_sql";

export async function getLastArenaBattleLog(): Promise<getLastArenaBattleLogRow | null> {
  return await _getLastArenaBattleLog(client());
}
