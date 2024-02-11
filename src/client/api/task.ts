import {apiFetch} from "@/lib/utils";

export const getTasks = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/task`;

  const res = await apiFetch<Response, undefined>(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    console.log("res", res);
    return res;
  }
  return res;
};
