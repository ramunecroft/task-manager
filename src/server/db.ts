import {PrismaNeon} from "@prisma/adapter-neon";
import {PrismaClient} from "@prisma/client";
import {env} from "@/env.mjs";
import {Pool, neonConfig} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const connectionString = env.DATABASE_URL;

const pool = new Pool({connectionString});

const adapter = new PrismaNeon(pool);

const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? prisma;

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
