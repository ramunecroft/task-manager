"use client";

import {TaskCard} from "@/components/task-card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useTaskList} from "@/hooks/use-task-list";
import {useTaskMutation} from "@/hooks/use-task-mutation";
import {type Task} from "@/server/db/schema";
import React, {type DragEvent} from "react";

type TaskSectionType = {
  status: Task["status"];
};

export const TaskSection = ({status}: TaskSectionType) => {
  const {data: taskList, isLoading} = useTaskList();

  const {mutate: taskMutate} = useTaskMutation();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const ticketCode = e.dataTransfer.getData("text/plain");
    const draggingTask = taskList?.find(task => task.ticketCode === ticketCode);
    if (!draggingTask) return;

    const newTask = {
      ...draggingTask,
      status,
    } satisfies Task;

    taskMutate(newTask);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <ScrollArea>
      <div className="text-md sticky top-0 bg-gray-100 px-4 py-2 font-semibold text-gray-500 dark:bg-gray-800/40 dark:text-white">
        <h3>{status.split("_").join(" ")}</h3>
      </div>
      <div
        className="min-h-screen bg-gray-100 dark:bg-gray-800/40"
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}>
        <div className="flex flex-col items-start justify-center space-y-2">
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
    </ScrollArea>
  );
};
