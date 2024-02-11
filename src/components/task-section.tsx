"use client";

import {TaskCard} from "@/components/task-card";
import {type Task} from "@/server/schema";
import {mutateAtom, postAtom, taskStore} from "@/store/task";
import {Provider, useAtomValue, useSetAtom} from "jotai";
import React, {type DragEvent} from "react";

type TaskSectionType = {
  status: Task["status"];
};

export const TaskSection = ({status}: TaskSectionType) => {
  const taskList = useAtomValue(postAtom);
  const mutate = useSetAtom(mutateAtom);

  if (!taskList) return;
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggingTask = taskList?.find(
      task => task.ticketCode === e.dataTransfer.getData("text/plain")
    );
    if (!draggingTask) return;

    await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticketCode: draggingTask.ticketCode,
        status,
      }),
    });
    await mutate(taskList);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Provider store={taskStore}>
      <div
        className="bg-gray-100 dark:bg-gray-800/40"
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}>
        <div className="flex flex-col items-start justify-center space-y-2">
          <h3 className="text-md mx-4 my-2 font-semibold text-gray-500 dark:text-white">
            {status.split("_").join(" ")}
          </h3>
          {Array.isArray(taskList) &&
            taskList
              .filter(task => task.status === status)
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
    </Provider>
  );
};
