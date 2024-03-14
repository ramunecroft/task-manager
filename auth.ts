import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/server/db";
import {type users} from "@/server/db/schema";
import {getUserById} from "@/server/users";

export const {
  handlers: {GET, POST},
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({user, account}) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id || "");
      if (!existingUser) return false;

      return true;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as (typeof users.role.enumValues)[number];
      }
      return session;
    },
    async jwt({token}) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
});
