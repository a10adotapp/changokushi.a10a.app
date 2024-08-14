"use server";

import { client } from "@/lib/db/client";
import { listArenaBattleLog as _listArenaBattleLog, listArenaBattleLogRow } from "@/sqlc/query_sql";

export async function listArenaBattleLog(): Promise<listArenaBattleLogRow[]> {
  return await _listArenaBattleLog(client());
}
