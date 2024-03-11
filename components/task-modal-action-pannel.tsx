import {TaskSelect} from "@/components/task-select";
import {Button} from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {type Task} from "@/server/db/schema";
import {ArrowUp, ArrowDown, CheckIcon, BanIcon} from "lucide-react";
import React from "react";

type TaskDetailModalActionPannelProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedTask: Task;
  onStatusChange: (status: Task["status"]) => void;
};

export const TaskModalActionPannel = ({
  isOpen,
  setIsOpen,
  selectedTask,
  onStatusChange,
}: TaskDetailModalActionPannelProps) => {
  return (
    <div
      id="task-detail-modal-action-pannel"
      className="col-span-2 flex flex-col gap-y-4">
      <Select onValueChange={(e: Task["status"]) => onStatusChange(e)}>
        <SelectTrigger className="bg-gray-100 font-extrabold">
          <SelectValue placeholder={selectedTask.status.split("_").join(" ")} />
        </SelectTrigger>
        <SelectContent className="font-extrabold">
          <SelectItem value="TO_DO">TO DO</SelectItem>
          <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
          <SelectItem value="IN_REVIEW">IN REVIEW</SelectItem>
          <SelectItem value="DONE">DONE</SelectItem>
        </SelectContent>
      </Select>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between border border-gray-300 px-3 py-2">
          <p className="font-bold text-gray-600">Details</p>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? <ArrowUp /> : <ArrowDown />}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="grid w-full gap-y-0 border border-gray-300">
            <TaskSelect selectLabel="Assignee" contentLabel="+ set status" />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
