import {SignUpForm} from "@/app/(auth)/components/sign-up-form";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {type Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "register",
};

export default function SignUpPage() {
  return (
    <>
      <Link
        href="/login"
        className={cn(
          buttonVariants({variant: "ghost"}),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}>
        Login
      </Link>
      <SignUpForm />
    </>
  );
}