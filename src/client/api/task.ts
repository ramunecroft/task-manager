import {API_URL} from "@/app/page";
import {fetch} from "@/lib/utils";

export const getTasks = async () => {
  console.log("proenv", process.env);
  console.log("xxx", API_URL);

  const url = `${API_URL}/api/task`;

  const res = await fetch(url, {
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
