import {atom} from "jotai/vanilla";

export const searchContextAtom = atom("");
searchContextAtom.debugLabel = "search context";

export const showDocumentationAtom = atom(false);
showDocumentationAtom.debugLabel = "documentation modal";
