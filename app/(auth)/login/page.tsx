import {SignInForm} from "@/app/(auth)/components/sign-in-form";
import {SocialButtons} from "@/app/(auth)/components/social-buttons";
import {Icons} from "@/components/icons";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {type Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "login",
};

export default function SignInPage() {
  return (
    <>
      <Link
        href="/"
        className={cn(
          buttonVariants({variant: "ghost"}),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}>
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <SignInForm />
      <SocialButtons />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/register"
          className="hover:text-brand underline underline-offset-4">
          Don&apos;t have an account? Sign Up
        </Link>
      </p>
    </>
  );
}
