import bcrypt from "bcryptjs";
import {signInSchema} from "@/server/db/schema";
import {getUserByEmail} from "@/server/users";
import Credentials from "@auth/core/providers/credentials";
import {type NextAuthConfig} from "next-auth";
import GitHub from "@auth/core/providers/github";

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
          console.log("passwordsMatch", passwordsMatch);
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
