import getDomain from "@/lib/get-domain";

export const getTasks = async () => {
  const domain = getDomain();
  const res = await fetch(`${domain}/api/task`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.headers.get("content-type") !== "application/json") {
    return {status: res.status, message: "Invalid content type"};
  }
  if (res.status === 200) {
    console.log("res", res);
    return res;
  }
  return res;
};
