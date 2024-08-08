"use server";

import { client } from "@/lib/db/client";
import { deleteWeaponLog } from "@/sqlc/query_sql";

export async function unregister(id: number): Promise<void> {
  await deleteWeaponLog(client(), {
    id,
  });
}
