"use client";

import {updateTaskStatus} from "@/client/api/task";
import {Icons} from "@/components/icons";
import {PriorityIcon} from "@/components/task-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {type Task} from "@/server/schema";
import {
  mutateAtom,
  selectedTaskAtom,
  showTaskModalAtom,
  taskListAtom,
} from "@/store/task";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {UserIcon} from "lucide-react";

export const TaskDetailModal = () => {
  const [showTaskModal, setShowTaskModal] = useAtom(showTaskModalAtom);
  const taskList = useAtomValue(taskListAtom);
  const mutate = useSetAtom(mutateAtom);
  const selectedTask = useAtomValue(selectedTaskAtom);
  if (!selectedTask) return;

  const onStatusChange = async (status: Task["status"]) => {
    await updateTaskStatus({
      status,
      ticketCode: selectedTask.ticketCode,
    });

    const updated = taskList.map(task => {
      if (task.ticketCode === selectedTask.ticketCode) {
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
        <div className="flex flex-col gap-y-2">
          <div id="tool-tip w-full">
            <div className="flex w-full flex-grow flex-row items-center justify-between">
              <div className="flex items-center justify-center space-x-2">
                <PriorityIcon level={selectedTask.priority} />
                <p>{selectedTask.ticketCode}</p>
              </div>
              <div className="mr-6 flex gap-x-2">
                <Icons.eye />
                <p>{selectedTask.viewCount}</p>
              </div>
            </div>
          </div>
          <div id="content" className="flex flex-row gap-x-8">
            <div id="left-content" className="basis-4/6 space-y-2">
              <div className="flex flex-grow items-start justify-start">
                <p className="text-3xl font-bold">{selectedTask.title}</p>
              </div>
              <div className="flex flex-grow justify-start">
                <UserIcon />
                <UserIcon />
                <UserIcon />
                <UserIcon />
                <UserIcon />
                <UserIcon />
              </div>
              <p className="text-gray-400">Description</p>
              <div className="flex flex-col bg-gray-100 p-1">
                {selectedTask.description}
              </div>
            </div>
            <div id="right-content" className="flex basis-2/6 flex-col">
              <Select onValueChange={(e: Task["status"]) => onStatusChange(e)}>
                <SelectTrigger className="w-[180px] bg-gray-100 font-extrabold">
                  <SelectValue placeholder={selectedTask.status.split("_").join(" ")} />
                </SelectTrigger>
                <SelectContent className="font-extrabold">
                  <SelectItem value="TO_DO">TO DO</SelectItem>
                  <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                  <SelectItem value="IN_REVIEW">IN REVIEW</SelectItem>
                  <SelectItem value="DONE">DONE</SelectItem>
                </SelectContent>
              </Select>
              <div id="task-detail">
                <Collapsible>
                  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
                  <CollapsibleContent>
                    Yes. Free to use for personal and commercial projects. No
                    attribution required.
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
