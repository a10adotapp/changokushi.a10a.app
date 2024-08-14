"use server";

import { client } from "@/lib/db/client";
import { getArenaBattleLogApproximateResultPoint } from "@/sqlc/query_sql";

export async function getApproximateResultPoint(
  opponentPower: number,
): Promise<{
  min: number;
  max: number;
}> {
  const approximateResultPoint = await getArenaBattleLogApproximateResultPoint(client(), {
    opponentPower_1: opponentPower,
    opponentPower_2: opponentPower,
  });

  if (!approximateResultPoint) {
    return {
      min: 0,
      max: 0,
    };
  }

  return {
    min: approximateResultPoint.minResultPoint,
    max: approximateResultPoint.maxResultPoint,
  }
}
