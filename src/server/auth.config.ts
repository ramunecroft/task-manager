import bcrypt from "bcryptjs";
import {signInSchema} from "@/server/db/schema";
import {getUserByEmail} from "@/server/users";
import Credentials from "@auth/core/providers/credentials";
import {type NextAuthConfig} from "next-auth";

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
  ],
} satisfies NextAuthConfig;
