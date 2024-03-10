import {db} from "@/server/db";
import {users} from "@/server/db/schema";
import {eq} from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
};
