import {clsx, type ClassValue} from "clsx";
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

async function apiFetch<Res, Req>(
  url: string,
  options: RequestInit,
  payload?: Req
): Promise<Response> {
  const response = await fetch(url, {...options, body: JSON.stringify(payload)});
  return response;
}

export {apiFetch as fetch};
