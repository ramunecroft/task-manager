import {API_URL} from "@/config";

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/api/user`);

  if (res.headers.get("content-type") !== "application/json") {
    return;
  }
  if (res.status === 200) {
    return res.json();
  }
  return res.json();
};
