"use client";

import {CommandMenu} from "@/components/command-menu";
import {Icons} from "@/components/icons";
import {MainNavigation} from "@/components/main-navigation";
import {showDocumentationAtom} from "@/store";
import {useSetAtom} from "jotai/react";
import Link from "next/link";

export function SiteHeader() {
  const setShowDocumentationModal = useSetAtom(showDocumentationAtom);

  return (
    <header className="sticky top-0 z-50 flex w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNavigation />
        <div className="flex flex-1 justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center justify-center">
            <Link
              className="flex items-center justify-center"
              target="_blank"
              rel="noreferrer"
              href={"https://github.com/ramunecroft/task-manager"}>
              <Icons.github />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
