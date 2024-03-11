import * as schema from "@/server/db/schema";
import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {env} from "process";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const client = postgres(env.DATABASE_URL || "", {
  connect_timeout: 300,
});

export const db = drizzle(client, {logger: true, schema});
