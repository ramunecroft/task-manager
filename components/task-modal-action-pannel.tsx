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
import {taskModalStateAtom} from "@/store/task";
import {useAtom} from "jotai";
import {ChevronDown, ChevronUp} from "lucide-react";
import React from "react";

export const TaskModalActionPannel = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [taskModalState, setTaskModalState] = useAtom(taskModalStateAtom);
  const {mutate: taskMutate, isSuccess} = useTaskMutation();

  if (!taskModalState) return;

  const onStatusChange = (status: Task["status"]) => {
    taskMutate({
      ...taskModalState,
      status,
    });
  };

  return (
    <div
      id="task-detail-modal-action-pannel"
      className="col-span-2 flex flex-col gap-y-4">
      <Select onValueChange={(e: Task["status"]) => onStatusChange(e)}>
        <SelectTrigger className="bg-gray-100 font-extrabold">
          <SelectValue placeholder={taskModalState.status.split("_").join(" ")} />
        </SelectTrigger>
        <SelectContent className="font-extrabold">
          <SelectItem value="todo">TO DO</SelectItem>
          <SelectItem value="in_progress">IN PROGRESS</SelectItem>
          <SelectItem value="review">IN REVIEW</SelectItem>
          <SelectItem value="done">DONE</SelectItem>
        </SelectContent>
      </Select>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between border border-gray-300 px-3 py-1">
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
            <TaskSelectDate date="startDate" />
            <TaskSelectDate date="dueDate" />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
