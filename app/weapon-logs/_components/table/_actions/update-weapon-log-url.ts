"use server";

import { client } from "@/lib/db/client";
import { createWeaponLog, listWeaponLogRow, updateWeaponLog } from "@/sqlc/query_sql";

export async function updateWeaponLogUrl(weaponLog: listWeaponLogRow, url: string): Promise<void> {
  await updateWeaponLog(client(), {
    id: weaponLog.id,
    name: weaponLog.name,
    url,
  });
}
