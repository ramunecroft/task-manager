"use client";

import {getTasks, updateTaskStatus} from "@/client/api/task";
import {TaskModalActionPannel} from "@/components/task-modal-action-pannel";
import {TaskModalHeader} from "@/components/task-modal-header";
import {TaskModalOverview} from "@/components/task-modal-overview";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {QUERY_KEY} from "@/constants";
import {type Task} from "@/server/db/schema";
import {showTaskModalAtom, taskModalAtom} from "@/store/task";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAtom, useAtomValue} from "jotai";
import React from "react";

export const TaskModal = () => {
  const queryClient = useQueryClient();
  const {data: taskList} = useQuery<Task[]>({
    queryKey: [QUERY_KEY.tasklist],
    queryFn: () => getTasks(),
  });

  const mutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: data => {
      queryClient.setQueryData<Task[] | undefined>(["taskList"], prev => {
        return prev?.map(el => {
          if (el.ticketCode === data.ticketCode) {
            return {
              ...el,
              status: data.status,
            };
          }
          return el;
        });
      });
    },
  });

  const [showTaskModal, setShowTaskModal] = useAtom(showTaskModalAtom);
  const taskModal = useAtomValue(taskModalAtom);
  const [isOpen, setIsOpen] = React.useState(false);

  if (!taskList) return;

  if (!taskModal) return;

  const onStatusChange = (status: Task["status"]) => {
    mutation.mutate({
      ...taskModal,
      status,
    });
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
