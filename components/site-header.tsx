"use client";

import {CommandMenu} from "@/components/command-menu";
import {Icons} from "@/components/icons";
import {MainNavigation} from "@/components/main-navigation";
import {Progress} from "@/components/ui/progress";
import {useConditionFragment} from "@/hooks/use-condition-fragment";
import {LogOutIcon} from "lucide-react";
import {type Session} from "next-auth";
import {signOut} from "next-auth/react";
import Link from "next/link";

type SiteHeaderProps = {
  session: Session | null;
};

export function SiteHeader({session}: SiteHeaderProps) {
  if (useConditionFragment() === null) return null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Progress />
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNavigation />
        <div className="flex flex-1 items-center justify-between gap-x-2 md:justify-end">
          {session && (
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
          )}
          <nav className="flex items-center justify-center gap-x-1">
            <Link
              data-cy="github-icon"
              className="flex items-center justify-center"
              target="_blank"
              rel="noreferrer"
              href={"https://github.com/ramunecroft/task-manager"}>
              <Icons.github />
            </Link>
            {session ? (
              <LogOutIcon data-cy="logout-icon" onClick={() => handleSignOut()} />
            ) : (
              <Link
                className="flex items-center justify-center"
                rel="noreferrer"
                href={"sign-in"}>
                <Icons.user />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
