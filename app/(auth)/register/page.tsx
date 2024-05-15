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
          "absolute top-4 right-4 md:top-8 md:right-8"
        )}>
        Login
      </Link>
      <SignUpForm />
    </>
  );
}
