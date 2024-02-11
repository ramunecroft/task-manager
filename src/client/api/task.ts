import {apiFetch} from "@/lib/utils";

export const getTasks = async () => {
  const url = `/api/task`;

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
