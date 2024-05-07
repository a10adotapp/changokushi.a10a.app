import { Pool, createPool } from "mysql2/promise";
import { env as _env } from "@/lib/env";

let _client: Pool;

export function client(): Pool {
  if (!_client) {
    const env = _env();

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
