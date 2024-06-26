"use client";

import {TaskModalActionPannel} from "@/components/task-modal-action-pannel";
import {TaskModalHeader} from "@/components/task-modal-header";
import {TaskModalOverview} from "@/components/task-modal-overview";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {showTaskModalAtom} from "@/store/task";
import {useAtom} from "jotai";

export const TaskModal = () => {
  const [showTaskModal, setShowTaskModal] = useAtom(showTaskModalAtom);

  return (
    <Dialog open={showTaskModal} onOpenChange={setShowTaskModal}>
      <DialogContent
        role={"task-modal"}
        className="my-8 mx-auto flex h-3/4 max-w-md flex-col items-start rounded-lg bg-white p-4 shadow-lg sm:max-w-xl md:max-w-6xl">
        <div className="flex h-full w-full flex-col gap-y-2">
          <TaskModalHeader />
          <div id="content" className="grid h-full grid-flow-col grid-cols-6 gap-x-8">
            <TaskModalOverview />
            <TaskModalActionPannel />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
