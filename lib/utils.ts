import {progressTriggeredAtom} from "@/store";
import {clsx, type ClassValue} from "clsx";
import {useSetAtom} from "jotai";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, formatStr: string): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return formatStr
    .replace("yyyy", year.toString())
    .replace("MM", month)
    .replace("dd", day);
}

async function ApiFetch(
  url: string,
  options?: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
) {
  const apiOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await fetch(url, {...apiOptions, body: JSON.stringify(payload)});
}

export {ApiFetch as fetch};
