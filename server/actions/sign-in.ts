"use server";

import {type ActionResult} from "@/types/index";
import {signIn as NextAuthSignIn} from "@/auth";
import {type z} from "zod";
import {AuthError} from "next-auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {signInSchema} from "@/lib/validations/auth";

export const SignIn = async (
  values: z.infer<typeof signInSchema>
): Promise<ActionResult> => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const {email, password} = validatedFields.data;

  try {
    await NextAuthSignIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
      isSuccess: true,
      message: "ログインに成功しました。",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            isSuccess: false,
            error: {
              message: "メールアドレスまたはパスワードが間違っています。",
            },
          };
        default:
          return {
            isSuccess: false,
            error: {
              message: "ログインに失敗しました。",
            },
          };
      }
    }

    throw error;
  }
};
