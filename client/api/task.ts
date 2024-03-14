import {API_URL} from "@/config";
import {type Task} from "@/server/db/schema";

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

export const updateTaskStatus = async (task: Task) => {
  const res = await fetch(`${API_URL}/api/task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      ticketCode: task.ticketCode,
      status: task.status,
    }),
  });

  return res.json() as Promise<Task>;
};
