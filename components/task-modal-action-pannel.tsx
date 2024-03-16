import {TaskSelect} from "@/components/task-select";
import {TaskSelectDate} from "@/components/task-select-date";
import {Button} from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useTaskMutation} from "@/hooks/use-task-mutation";
import {type Task} from "@/server/db/schema";
import {taskModalAtom} from "@/store/task";
import {useAtomValue} from "jotai";
import {ChevronDown, ChevronUp} from "lucide-react";
import React from "react";

export const TaskModalActionPannel = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const taskModal = useAtomValue(taskModalAtom);
  const {mutate: taskMutate} = useTaskMutation();

  if (!taskModal) return;

  const onStatusChange = (status: Task["status"]) => {
    taskMutate({
      ...taskModal,
      status,
    });
  };

  return (
    <div
      id="task-detail-modal-action-pannel"
      className="col-span-2 flex flex-col gap-y-4">
      <Select onValueChange={(e: Task["status"]) => onStatusChange(e)}>
        <SelectTrigger className="bg-gray-100 font-extrabold">
          <SelectValue placeholder={taskModal.status.split("_").join(" ")} />
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
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="grid w-full gap-y-0 border border-gray-300">
            <TaskSelect selectLabel="Assignee" />
            <TaskSelect selectLabel="Priority" />
            <TaskSelectDate />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
