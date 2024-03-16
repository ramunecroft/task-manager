import {API_URL} from "@/config";
import {fetch} from "@/lib/utils";
import {type UpdateTaskInput, type Task} from "@/server/db/schema";

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/api/task`);

  if (res.headers.get("content-type") !== "application/json") {
    return;
  }
  if (res.status === 200) {
    return res.json();
  }
  return res.json();
};

export const updateTaskStatus = async (task: UpdateTaskInput) => {
  const res = await fetch(
    `${API_URL}/api/task`,
    {
      method: "PUT",
    },
    task
  );

  return res.json() as Promise<Task>;
};
