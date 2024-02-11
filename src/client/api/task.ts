import {fetch} from "@/lib/utils";
import {type Task} from "@/server/schema";

export const getTasks = async () => {
  const url = "http://localhost:3000/api/task";
  const res = await fetch<Task[], undefined>(url, {
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
