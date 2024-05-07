import { z } from "zod";
import { Pool, createPool } from "mysql2/promise";

let _client: Pool;

export const dynamic = "force-dynamic";

export function client(): Pool {
  if (!_client) {
    const env = z.object({
      DB_HOST: z.string().min(1),
      DB_PORT: z.coerce.number(),
      DB_USER: z.string().min(1),
      DB_PASS: z.string().min(1),
      DB_NAME: z.string().min(1),
    }).parse({
      DB_HOST: "DB_HOST",
      DB_PORT: 0,
      DB_USER: "DB_USER",
      DB_PASS: "DB_PASS",
      DB_NAME: "DB_NAME",
      ...process.env,
    });

    _client = createPool({
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      namedPlaceholders: true,
    });
  }

  return _client;
}
