"use server";

import {type ActionResult} from "@/types/index";
import {type z} from "zod";
import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/server/users";
import {db} from "@/server/db";
import {signUpSchema} from "@/lib/validations/auth";
import {users} from "@/server/db/schema";

export const signUp = async (
  values: z.infer<typeof signUpSchema>
): Promise<ActionResult> => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const {email, password, name} = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: "User already exist",
        },
      };
    }

    await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
    });

    return {
      isSuccess: true,
      message: "User created",
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        message: "Something went wrong",
      },
    };
  }
};
