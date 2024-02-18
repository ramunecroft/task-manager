"use client";

import {updateTaskStatus} from "@/client/api/task";
import {TaskCard} from "@/components/task-card";
import {type Task} from "@/server/schema";
import {mutateAtom, taskListAtom} from "@/store/task";
import {useAtomValue, useSetAtom} from "jotai";
import React, {type DragEvent} from "react";

type TaskSectionType = {
  status: Task["status"];
};

export const TaskSection = ({status}: TaskSectionType) => {
  const taskList = useAtomValue(taskListAtom);
  const mutate = useSetAtom(mutateAtom);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggingTask = taskList?.find(
      task => task.ticketCode === e.dataTransfer.getData("text/plain")
    );
    if (!draggingTask) return;

    await updateTaskStatus({
      status,
      ticketCode: draggingTask.ticketCode,
    });

    const updated = taskList.map(task => {
      if (task.ticketCode === draggingTask.ticketCode) {
        task.status = status;
      }
      return task;
    });

    mutate(updated);
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
        {Array.isArray(taskList) ? (
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
            ))
        ) : (
          <h1>No Data</h1>
        )}
      </div>
    </div>
  );
};
