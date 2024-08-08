"use server";

import { client } from "@/lib/db/client";
import { createWeaponLog } from "@/sqlc/query_sql";

export async function registerWeaponLog(name: string): Promise<void> {
  await createWeaponLog(client(), {
    name,
  });
}
