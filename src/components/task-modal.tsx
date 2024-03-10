"use client";

import {updateTaskStatus} from "@/client/api/task";
import {TaskModalActionPannel} from "@/components/task-modal-action-pannel";
import {TaskModalHeader} from "@/components/task-modal-header";
import {TaskModalOverview} from "@/components/task-modal-overview";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {type Task} from "@/server/db/schema";
import {mutateAtom, showTaskModalAtom, taskListAtom, taskModalAtom} from "@/store/task";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import React from "react";

export const TaskModal = () => {
  const [showTaskModal, setShowTaskModal] = useAtom(showTaskModalAtom);
  const taskModal = useAtomValue(taskModalAtom);
  const taskList = useAtomValue(taskListAtom);
  const mutate = useSetAtom(mutateAtom);
  const [isOpen, setIsOpen] = React.useState(false);

  if (!taskModal) return;

  const onStatusChange = async (status: Task["status"]) => {
    await updateTaskStatus({
      ...taskModal,
      status,
    });

    const updated = taskList.map(task => {
      if (task.ticketCode === taskModal.ticketCode) {
        task.status = status;
      }
      return task;
    });
    mutate(updated);
  };

  return (
    <Dialog open={showTaskModal} onOpenChange={setShowTaskModal}>
      <DialogContent
        role={"task-modal"}
        className="mx-auto my-8 flex h-3/4 max-w-md flex-col items-start rounded-lg bg-white p-4 shadow-lg sm:max-w-xl md:max-w-6xl">
        <div className="flex h-full w-full flex-col gap-y-2">
          <TaskModalHeader task={taskModal} />
          <div id="content" className="grid h-full grid-flow-col grid-cols-6 gap-x-8">
            <TaskModalOverview />
            <TaskModalActionPannel
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedTask={taskModal}
              onStatusChange={onStatusChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
