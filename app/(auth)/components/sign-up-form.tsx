"use client";

import {FormError} from "@/app/(auth)/components/form-error";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {signUp} from "@/server/actions/sign-up";
import {type signUpSchema} from "@/server/db/schema";
import {useRouter} from "next/navigation";
import React from "react";
import {useForm} from "react-hook-form";
import {type z} from "zod";

export const SignUpForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    startTransition(async () => {
      const result = await signUp(values);
      router.push("/");
      if (!result.isSuccess) {
        setErrorMessage(result.error.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex max-w-[500px] flex-1 flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={errorMessage} />
        <Button disabled={isPending}>Create Account</Button>
      </form>
    </Form>
  );
};
