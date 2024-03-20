import {updateTaskStatus} from "@/client/api/task";
import {QUERY_KEY} from "@/constants";
import {type Task} from "@/server/db/schema";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

export const useTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, Task, {previousTasks?: Task[]}>({
    mutationFn: updateTaskStatus,
    onSuccess: newTask => {
      queryClient.setQueryData<Task[] | undefined>([QUERY_KEY.tasklist], prev =>
        prev?.map(task =>
          task.ticketCode === newTask.ticketCode ? {...newTask} : task
        )
      );
    },
    onMutate: updatedTask => {
      const previousTasks = queryClient.getQueryData<Task[]>([QUERY_KEY.tasklist]);

      queryClient.setQueryData<Task[]>([QUERY_KEY.tasklist], old =>
        old?.map(task =>
          task.id === updatedTask.id ? {...task, ...updatedTask} : task
        )
      );

      return {previousTasks};
    },
    onError: (error, newTask, context) => {
      queryClient.setQueryData<Task[]>([QUERY_KEY.tasklist], context?.previousTasks);
      toast("Failed to update Task", {
        description: "An error occurred while updating the task",
        action: {
          label: "Undo",
          onClick: () => {},
        },
      });
    },
  });
};
