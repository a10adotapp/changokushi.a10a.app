"use server";

import { client } from "@/lib/db/client";
import { createArenaBattleLog } from "@/sqlc/query_sql";

export async function save(
  data: {
    point: number;
    power: number;
    opponentPoint: number;
    opponentPower: number;
    resultPoint: number;
  },
): Promise<void> {
  await createArenaBattleLog(client(), data);
}
