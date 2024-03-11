import {type users} from "@/server/db/schema";
import NextAuth, {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: (typeof users.role.enumValues)[number];
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
