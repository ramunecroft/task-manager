import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/server/users";
import type {NextAuthConfig} from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "@auth/core/providers/credentials";
import {signInSchema} from "@/lib/validations/auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const {email, password} = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
