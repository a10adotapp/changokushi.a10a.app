"use server";

import { client } from "@/lib/db/client";
import { getWeaponLogByNameRow, updateWeaponLog } from "@/sqlc/query_sql";

export async function update(
  weaponLog: getWeaponLogByNameRow,
  data: {
    url: string | null;
  },
): Promise<void> {
  await updateWeaponLog(client(), {
    id: weaponLog.id,
    name: weaponLog.name,
    url: data.url,
  });
}
