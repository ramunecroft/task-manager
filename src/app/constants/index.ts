export const Priority = {
  Lower: "lower",
  Low: "low",
  Medium: "medium",
  High: "high",
  Highest: "highest",
} as const;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
