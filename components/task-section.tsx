"use client";

import {TaskCard} from "@/components/task-card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useTaskList} from "@/hooks/use-task-list";
import {cn} from "@/lib/utils";
import {type Task} from "@/server/db/schema";
import {Draggable, Droppable} from "react-beautiful-dnd";

type TaskSectionType = {
  status: Task["status"];
};

export const TaskSection = ({status}: TaskSectionType) => {
  const {data: taskList, isLoading} = useTaskList();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ScrollArea>
      <div
        className="text-md sticky top-0 bg-gray-100 py-2 px-2 pl-4
       font-semibold text-gray-500 dark:bg-gray-800/40 dark:text-white">
        <h3>{status[0].toUpperCase() + status.slice(1).split("_").join(" ")}</h3>
      </div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800/40">
        <div className="flex flex-col items-start justify-center space-y-2">
          <Droppable droppableId={status}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn("flex min-h-screen w-full flex-col gap-y-2")}>
                {taskList
                  ?.filter(task => task.status === status)
                  .sort((a, b) => a.order - b.order)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <TaskCard
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={task.ticketCode}
                            description={task.description}
                            ticketCode={task.ticketCode}
                            priority={task.priority}
                            voteCount={task.voteCount}
                            className={cn(snapshot.isDragging && "bg-gray-200")}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </ScrollArea>
  );
};
