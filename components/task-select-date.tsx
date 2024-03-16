"use client";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useTaskMutation} from "@/hooks/use-task-mutation";
import {cn} from "@/lib/utils";
import {type Task} from "@/server/db/schema";
import {taskModalAtom} from "@/store/task";
import {format} from "date-fns";
import {useAtom, useAtomValue} from "jotai";
import {CalendarIcon} from "lucide-react";

export const TaskSelectDate = () => {
  const [taskModalState, setTaskModalState] = useAtom(taskModalAtom);
  const {mutate: taskMutate} = useTaskMutation();

  if (!taskModalState) return null;

  const onSelect = (day: Date) => {
    const payload = {
      ...taskModalState,
      startDate: format(day, "yyyy-MM-dd"),
    } satisfies Task;

    taskMutate(payload);
    setTaskModalState(payload);
  };
  return (
    <div className="grid grid-flow-col grid-cols-8 items-center px-3 py-2 focus:shadow">
      <p className="col-span-3 text-sm text-muted-foreground">Start Date</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[200px] px-4 py-2 text-left font-normal",
              !taskModalState?.startDate && "text-muted-foreground"
            )}>
            {taskModalState?.startDate ? (
              <p>{format(taskModalState.startDate, "PPP")}</p>
            ) : (
              <p className="text-black">Pick a date</p>
            )}

            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={new Date(taskModalState?.startDate || "")}
            onDayClick={onSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
