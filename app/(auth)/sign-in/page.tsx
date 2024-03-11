import {SignInForm} from "@/app/(auth)/components/sign-in-form";
import {SocialButtons} from "@/app/(auth)/components/social-buttons";

export default function SignInPage() {
  return (
    <div className="container flex max-w-[500px] flex-col items-center justify-center gap-y-4">
      <SignInForm />
      <SocialButtons />
    </div>
  );
}
