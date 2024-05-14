"use client";

import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {priority} from "@/constants";
import {useTaskMutation} from "@/hooks/use-task-mutation";
import {useUserList} from "@/hooks/use-user-list";
import {type Task} from "@/server/db/schema";
import {taskModalStateAtom} from "@/store/task";
import {useAtom} from "jotai";
import React from "react";

type TaskSelectProps = {
  selectLabel: "Assignee" | "Priority";
};

export const TaskSelect = ({selectLabel}: TaskSelectProps) => {
  const [taskModalState, setTaskModalState] = useAtom(taskModalStateAtom);
  const [open, setOpen] = React.useState(false);

  const {data: userList} = useUserList();

  const {mutate: taskMutate} = useTaskMutation();

  const label = React.useMemo(() => {
    if (selectLabel === "Assignee") {
      const selectedUser = userList?.find(user => user.id === taskModalState?.ownerId);
      return selectedUser ? selectedUser.name : "Select Assignee";
    }
    return taskModalState?.priority ? taskModalState?.priority : "Select Priority";
  }, [taskModalState, userList, selectLabel]);

  const items = React.useMemo(() => {
    const listItems =
      selectLabel === "Assignee"
        ? userList?.map(user => ({id: user.id, displayValue: user.name}))
        : Object.entries(priority).map(([key, value]) => ({
            id: key,
            displayValue: value.charAt(0).toUpperCase() + value.slice(1),
          }));

    return listItems?.map(item => (
      <CommandItem
        key={item.id}
        value={item.id}
        onSelect={() => updateTask(selectLabel.toLowerCase() as keyof Task, item.id)}>
        {item.displayValue}
      </CommandItem>
    ));
  }, [userList, selectLabel]);

  if (!taskModalState || !userList) return <></>;

  const updateTask = (key: keyof Task, value: string) => {
    if (taskModalState[key] === value) {
      setOpen(false);
      return;
    }

    const updatedTask: Task = {
      ...taskModalState,
      [key]: value,
    };

    taskMutate(updatedTask, {
      onSuccess: () => {
        setTaskModalState(updatedTask);
        setOpen(false);
      },
    });
  };

  return (
    <div className="grid grid-flow-col grid-cols-8 items-center py-2 px-3 focus:shadow">
      <p className="text-muted-foreground col-span-3 text-sm">{selectLabel}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-start">
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandGroup>
                {items && items.length > 0 ? (
                  items
                ) : (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
