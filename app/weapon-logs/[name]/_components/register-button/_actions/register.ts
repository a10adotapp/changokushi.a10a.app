"use server";

import { client } from "@/lib/db/client";
import { createWeaponLog } from "@/sqlc/query_sql";

export async function register(name: string): Promise<void> {
  await createWeaponLog(client(), {
    name,
  });
}
