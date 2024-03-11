"use client";

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {DEFAULT_LOGIN_REDIRECT} from "../../../../routes";
import {Icons} from "@/components/icons";

export const SocialButtons = () => {
  const handleClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick("github")}>
        <Icons.github className="h-5 w-5" />
        <span className="ml-2">GitHub</span>
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick("github")}>
        <Icons.github className="h-5 w-5" />
        <span className="ml-2">GitHub</span>
      </Button>
    </div>
  );
};
