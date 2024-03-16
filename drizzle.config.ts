import type {Config} from "drizzle-kit";
import {env} from "@/env.mjs";

export default {
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: env.DATABASE_URL ?? "",
  },
  driver: "pg",
  verbose: true,
  strict: true,
} satisfies Config;
