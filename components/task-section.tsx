"use client";

import {getTasks, updateTaskStatus} from "@/client/api/task";
import {TaskCard} from "@/components/task-card";
import {QUERY_KEY} from "@/constants";
import {type Task} from "@/server/db/schema";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {type DragEvent} from "react";

type TaskSectionType = {
  status: Task["status"];
};

export const TaskSection = ({status}: TaskSectionType) => {
  const queryClient = useQueryClient();

  const {data: taskList} = useQuery<Task[]>({
    queryKey: [QUERY_KEY.tasklist],
    queryFn: () => getTasks(),
  });

  const mutation = useMutation<Task, Error, Task, {previousTasks?: Task[]}>({
    mutationFn: updateTaskStatus,
    onSuccess: newTask => {
      queryClient.setQueryData<Task[] | undefined>([QUERY_KEY.tasklist], prev =>
        prev?.map(task =>
          task.ticketCode === newTask.ticketCode
            ? {...task, status: newTask.status}
            : task
        )
      );
    },
    onError: (error, newTask, context) => {
      queryClient.setQueryData<Task[]>([QUERY_KEY.tasklist], context?.previousTasks);
    },
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const ticketCode = e.dataTransfer.getData("text/plain");
    const draggingTask = taskList?.find(task => task.ticketCode === ticketCode);
    if (!draggingTask) return;

    const newTask = {
      ...draggingTask,
      status,
    } satisfies Task;

    mutation.mutate(newTask);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-800/40"
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}>
      <div className="flex flex-col items-start justify-center space-y-2">
        <h3 className="text-md mx-4 my-2 font-semibold text-gray-500 dark:text-white">
          {status.split("_").join(" ")}
        </h3>
        {taskList
          ?.filter(task => task.status === status)
          .map((task, index) => (
            <TaskCard
              key={task.ticketCode}
              description={task.description}
              ticketCode={task.ticketCode}
              priority={task.priority}
              voteCount={task.voteCount}
            />
          ))}
      </div>
    </div>
  );
};
