import {API_URL} from "@/app/constants";
import {fetch} from "@/lib/utils";

export const getTasks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/task`, {
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
