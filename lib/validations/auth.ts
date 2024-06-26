import {z} from "zod";

export const signUpSchema = z.object({
  email: z.string().email({
    message: "メールアドレスは必須です。",
  }),
  password: z.string().min(6, {
    message: "パスワードは6文字以上です。",
  }),
  name: z.string().min(1, {
    message: "ニックネームは必須です。",
  }),
});

export const signInSchema = z.object({
  email: z.string().email({
    message: "メールアドレスは必須です。",
  }),
  password: z.string().min(6, {
    message: "パスワードは6文字以上です。",
  }),
});
