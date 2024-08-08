"use server";

import { client } from "@/lib/db/client";
import { createWeaponLog, deleteWeaponLog } from "@/sqlc/query_sql";

export async function unregisterWeaponLog(id: number): Promise<void> {
  await deleteWeaponLog(client(), {
    id,
  });
}
