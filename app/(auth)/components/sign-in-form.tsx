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
import {signInSchema} from "@/lib/validations/auth";
import {SignIn} from "@/server/actions/sign-in";
import {progressTriggeredAtom} from "@/store";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSetAtom} from "jotai";
import React from "react";
import {useForm} from "react-hook-form";
import {type z} from "zod";

export const SignInForm = () => {
  const setProgressTriggered = useSetAtom(progressTriggeredAtom);
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
    setProgressTriggered(true);
    startTransition(async () => {
      const result = await SignIn(values);

      if (!result.isSuccess) {
        setErrorMessage(result.error.message);
        return;
      }
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
                <Input placeholder="name@example.com" {...field} />
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
          Sign In with Email
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <FormError message={errorMessage} />
      </form>
    </Form>
  );
};
