"use client";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useTaskMutation} from "@/hooks/use-task-mutation";
import {cn} from "@/lib/utils";
import {type Task} from "@/server/db/schema";
import {taskModalStateAtom} from "@/store/task";
import {format} from "date-fns";
import {useAtom} from "jotai";
import {CalendarIcon} from "lucide-react";

type TaskSelectDateProps = {
  date: "startDate" | "dueDate";
};

export const TaskSelectDate = ({date}: TaskSelectDateProps) => {
  const [taskModalState, setTaskModalState] = useAtom(taskModalStateAtom);
  const {mutate: taskMutate} = useTaskMutation();

  if (!taskModalState) return null;

  const updateTaskDate = (selectedDate: Date) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const updatedTask = {...taskModalState, [date]: formattedDate} as Task;

    taskMutate(updatedTask);
    setTaskModalState(updatedTask);
  };

  const selectedDate =
    date === "startDate"
      ? new Date(taskModalState?.startDate || "")
      : new Date(taskModalState?.dueDate || "");

  const dateLabel = date === "startDate" ? "Start date" : "Due date";

  const formattedSelectedDate = taskModalState[date]
    ? format(new Date(taskModalState[date] || Date.now()), "PPP")
    : "Pick a date";
  const isDateSelected = !!taskModalState[date];

  return (
    <div className="grid grid-flow-col grid-cols-8 items-center px-3 py-2 focus:shadow">
      <p className="col-span-3 text-sm text-muted-foreground">{dateLabel}</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] px-4 py-2 text-left font-normal",
              !isDateSelected && "text-muted-foreground"
            )}>
            <p className={isDateSelected ? "text-black" : ""}>
              {formattedSelectedDate}
            </p>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar mode="single" selected={selectedDate} onDayClick={updateTaskDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
