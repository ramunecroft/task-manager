import authConfig from "@/server/auth.config";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/server/db";

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
});
