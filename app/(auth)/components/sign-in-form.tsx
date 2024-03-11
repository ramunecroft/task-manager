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
import {SignIn} from "@/server/actions/sign-in";
import {signInSchema} from "@/server/db/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useForm} from "react-hook-form";
import {type z} from "zod";

export const SignInForm = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    startTransition(async () => {
      const result = await SignIn(values);
    });
  };
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-1 flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>email</FormLabel>
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
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
        <FormError message={errorMessage} />
      </form>
    </Form>
  );
};
