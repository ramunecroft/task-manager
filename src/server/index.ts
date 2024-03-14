import * as schema from "@/server/schema";
import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const client = postgres(process.env.DATABASE_URL ?? "", {
  connect_timeout: 300,
});

export const db = drizzle(client, {logger: true, schema});
