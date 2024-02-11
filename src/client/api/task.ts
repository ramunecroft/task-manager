export const getTasks = async () => {
  const res = await fetch(`http://localhost:3000/api/task`, {
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
