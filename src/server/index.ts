import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {migrate} from "drizzle-orm/postgres-js/migrator";
import * as schema from "@/server/schema";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const client = postgres(process.env.DATABASE_URL ?? "");

export const db = drizzle(client, {logger: true, schema});

await migrate(db, {migrationsFolder: "drizzle"});
