"use server";

import { client } from "@/lib/db/client";
import { updateArenaBattleLog } from "@/sqlc/query_sql";

export async function save(
  id: number,
  data: {
    point: number;
    power: number;
    opponentPoint: number;
    opponentPower: number;
    resultPoint: number;
  },
): Promise<void> {
  await updateArenaBattleLog(client(), {
    ...data,
    id,
  });
}
