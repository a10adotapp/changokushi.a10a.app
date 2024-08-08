"use server";

import { client } from "@/lib/db/client";
import { getWeaponLogByName, getWeaponLogByNameRow } from "@/sqlc/query_sql";

export async function getWeapon(
  name: string,
): Promise<getWeaponLogByNameRow | null> {
  return await getWeaponLogByName(client(), {
    name,
  });
}
