export const getTasks = async () => {
  const res = await fetch(`/api/task`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (res.status === 200) {
    console.log("res", res);
    return res;
  }
  return res;
};
