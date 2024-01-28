"use client";

import {DocumentationModal} from "@/components";
import {
  ActionPanel,
  HeaderContainer,
  MainNavigation,
  SearchButton,
} from "@/components/header";
import {showDocumentationAtom} from "@/store";
import {useSetAtom} from "jotai/react";
import {useEffect} from "react";

/**
 * Header
 */
export const Header = () => {
  const setShowDocumentationModal = useSetAtom(showDocumentationAtom);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key == "k") {
        setShowDocumentationModal(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <HeaderContainer>
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNavigation />
        <div className="flex flex-1 justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchButton onClick={() => setShowDocumentationModal(true)} />
          </div>
          <ActionPanel />
        </div>
      </div>
      <DocumentationModal />
    </HeaderContainer>
  );
};
