"use client";

import {DocumentationModal, SearchButton} from "@/components";
import {GithubIcon, HomeIcon} from "@/components/icons";
import {showDocumentationAtom} from "@/store";
import {useSetAtom} from "jotai/react";

/**
 * Header
 */
export const Header = () => {
  const menus = ["Docs", "Components", "Themes"];
  const setShowDocumentationModal = useSetAtom(showDocumentationAtom);
  return (
    <header className="sticky top-0 z-50 flex w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <a href="/" className="mr-6 flex items-center space-x-2">
          <HomeIcon />
          <span className="hidden font-bold sm:inline-block">Task Manager</span>
        </a>
        <nav className="flex items-center gap-6 text-sm">
          {menus.map((el, index) => (
            <a
              className="cursor-pointer text-foreground/60 transition-colors hover:text-foreground/80"
              key={index}>
              {el}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchButton onClick={() => setShowDocumentationModal(true)} />
          </div>
          <nav className="flex items-center justify-center">
            <a
              className="flex items-center justify-center"
              target="_blank"
              rel="noreferrer">
              <GithubIcon />
            </a>
          </nav>
        </div>
        <nav className="flex items-center"></nav>
      </div>
      <DocumentationModal />
    </header>
  );
};
