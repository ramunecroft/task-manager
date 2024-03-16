import {updateTaskStatus} from "@/client/api/task";
import {QUERY_KEY} from "@/constants";
import {type Task} from "@/server/db/schema";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, Task, {previousTasks?: Task[]}>({
    mutationFn: updateTaskStatus,
    onSuccess: newTask => {
      queryClient.setQueryData<Task[] | undefined>([QUERY_KEY.tasklist], prev =>
        prev?.map(task =>
          task.ticketCode === newTask.ticketCode
            ? {
                ...task,
                status: newTask.status,
                ownerId: newTask.ownerId,
                startDate: newTask.startDate,
                priority: newTask.priority,
                description: newTask.description,
                title: newTask.title,
              }
            : task
        )
      );
    },
    onError: (error, newTask, context) => {
      queryClient.setQueryData<Task[]>([QUERY_KEY.tasklist], context?.previousTasks);
    },
  });
};
