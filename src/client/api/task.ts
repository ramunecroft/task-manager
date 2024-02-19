import {API_URL} from "@/app/config";
import {type DragUpdateTaskInput} from "@/server/schema";

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/api/task`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.headers.get("content-type") !== "application/json") {
    return;
  }
  if (res.status === 200) {
    return res.json();
  }
  return res.json();
};

export const updateTaskStatus = async ({
  status,
  ticketCode,
  title,
  description,
}: DragUpdateTaskInput) => {
  const res = await fetch(`${API_URL}/api/task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      ticketCode,
      status,
    }),
  });

  return res.json();
};
