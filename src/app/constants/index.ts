import {headers} from "next/headers";

export const Priority = {
  Lower: "lower",
  Low: "low",
  Medium: "medium",
  High: "high",
  Highest: "highest",
} as const;

const url = headers().get("host");
const protocol = "https";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? `${protocol}://${url}`;
