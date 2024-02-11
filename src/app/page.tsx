import {headers} from "next/headers";

const url = headers().get("host");
const protocol = "https";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? `${protocol}://${url}`;

export default function Home() {
  return <div>Home</div>;
}
