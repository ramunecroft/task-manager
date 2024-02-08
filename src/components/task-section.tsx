"use client";

import {jsonTaskList, type TaskType} from "@/app/config/docs";
import {TaskCard} from "@/components/task-card";
import {taskListAtom} from "@/store/task";
import {useAtom} from "jotai";
import React, {useEffect, type DragEvent} from "react";

type TaskSectionType = {
  status: TaskType["status"];
};

export const TaskSection = ({status}: TaskSectionType) => {
  const [taskList, setTaskList] = useAtom(taskListAtom);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggingTask = taskList.find(
      task => task.ticketCode === e.dataTransfer.getData("text/plain")
    );
    if (!draggingTask) return;

    console.log(`Task with Ticket Code ${draggingTask?.ticketCode} moved to ${status}`);

    setTaskList(prev =>
      prev.map(task => {
        if (task.ticketCode === draggingTask.ticketCode) {
          return {...task, status: status};
        }
        return task;
      })
    );
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
          {status}
        </h3>
        {taskList
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
  );
};
