"use client";

import {statuses} from "@/app/data";
import {TaskSection} from "@/components/task-section";
import {Button} from "@/components/ui/button";
import {useTaskList} from "@/hooks/use-task-list";
import {useTaskMutation} from "@/hooks/use-task-mutation";
import {createStringTime} from "@/lib/utils";
import {type Task} from "@/server/db/schema";
import {FolderIcon} from "lucide-react";
import Link from "next/link";
import {DragDropContext, type DropResult} from "react-beautiful-dnd";

export const TaskBoard = () => {
  const {data: taskList} = useTaskList();
  const {mutate: taskMutate} = useTaskMutation();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const targetStatus = result.destination.droppableId as Task["status"];
    const taskId = result.draggableId;
    const sourceTask = taskList?.find(task => task.id === taskId);
    if (!sourceTask) return;
    const updatedAt = createStringTime(new Date());
    const updatedTask = {...sourceTask, status: targetStatus, updatedAt} satisfies Task;
    taskMutate({
      ...updatedTask,
    });
  };

  return (
    <div className="w-full flex-1 flex-col">
      <header className="flex h-14 items-center border-b">
        <h1 className="text-lg font-semibold">Scrum Board</h1>
        <div className="ml-auto flex gap-4">
          <Button size="sm" variant="outline">
            Add Task
          </Button>
          <Button size="sm" variant="outline">
            Filter
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r bg-gray-100/40 p-4 dark:bg-gray-800/40">
          <h2 className="mb-2 text-sm font-semibold">Sprints</h2>
          <nav className="space-y-2">
            <Link className="flex items-center gap-2 text-sm font-medium" href="#">
              <FolderIcon className="h-4 w-4" />
              Sprint 1
            </Link>
            <Link className="flex items-center gap-2 text-sm font-medium" href="#">
              <FolderIcon className="h-4 w-4" />
              Sprint 2
            </Link>
            <Link className="flex items-center gap-2 text-sm font-medium" href="#">
              <FolderIcon className="h-4 w-4" />
              Sprint 3
            </Link>
          </nav>
        </div>
        <div className="grid h-screen flex-1 grid-flow-col grid-cols-4 gap-8">
          <DragDropContext onDragEnd={result => onDragEnd(result)}>
            {statuses.map(status => {
              if (status.value === "backlog") return;
              return (
                <TaskSection
                  key={status.value}
                  status={status.value as Task["status"]}
                />
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};
