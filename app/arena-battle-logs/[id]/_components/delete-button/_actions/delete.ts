"use server";

import { client } from "@/lib/db/client";
import { deleteArenaBattleLog as _deleteArenaBattleLog } from "@/sqlc/query_sql";

export async function deleteArenaBattleLog(
  id: number,
): Promise<void> {
  await _deleteArenaBattleLog(client(), {
    id,
  });
}
