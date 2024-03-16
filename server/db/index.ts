import * as schema from "@/server/db/schema";
import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {env} from "@/env.mjs";

// @see {https://github.com/orgs/supabase/discussions/18986}

let client: postgres.Sql;

if (process.env.NODE_ENV === "production") {
  client = postgres(env.DATABASE_URL, {prepare: false});
} else {
  const globalConnection = global as typeof globalThis & {
    connection: postgres.Sql;
  };

  if (!globalConnection.connection) {
    globalConnection.connection = postgres(env.DATABASE_URL, {
      prepare: false,
    });
  }

  client = globalConnection.connection;
}

export const db = drizzle(client, {schema, logger: env.NODE_ENV === "development"});
