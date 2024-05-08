import { Pool, createPool } from "mysql2/promise";

let _client: Pool;

export function client(): Pool {
  if (!_client) {
    _client = createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      namedPlaceholders: true,
    });
  }

  return _client;
}
