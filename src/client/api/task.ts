import {API_URL} from "@/app/config";
import {DragUpdateTaskInput, type Task} from "@/server/schema";

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

export const updateDraggingTask = async ({status, ticketCode}: DragUpdateTaskInput) => {
  const res = await fetch(`${API_URL}/api/task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ticketCode,
      status,
    }),
  });

  return res.json();
};
