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

  const {mutate: taskMutate, isSuccess} = useTaskMutation();

  if (!taskModalState || !userList) return null;

  const updateTask = (key: keyof Task, value: string) => {
    if (taskModalState?.[key] === value) {
      setOpen(false);
      return;
    }

    const payload: Task = {
      ...taskModalState,
      [key]: value,
    };

    taskMutate(payload, {
      onSuccess: () => {
        setTaskModalState(payload);
        setOpen(false);
      },
    });
  };

  const selectedUser = userList?.find(
    user => user.id === taskModalState?.ownerId?.toString()
  );

  const selectedPriority = taskModalState?.priority;

  const generateListItems = (
    items: Array<{id: string; displayValue: string}>,
    onSelect: (value: string) => void
  ) => {
    return items.map(item => (
      <CommandItem key={item.id} value={item.id} onSelect={() => onSelect(item.id)}>
        {item.displayValue}
      </CommandItem>
    ));
  };

  const assigneeList = generateListItems(
    userList.map(user => ({id: user.id, displayValue: user.name || ""})),
    value => updateTask("ownerId", value)
  );
  const statusList = generateListItems(
    Object.values(priority).map(status => ({
      id: status,
      displayValue: status.charAt(0).toUpperCase() + status.slice(1),
    })),
    value => updateTask("priority", value)
  );

  const label =
    selectLabel === "Assignee" && selectedUser ? (
      <p className="font-normal text-black">{selectedUser.name}</p>
    ) : selectLabel === "Priority" ? (
      <p className="font-normal capitalize text-black">{selectedPriority}</p>
    ) : (
      <p className="text-muted-foreground">NONE</p>
    );

  return (
    <div className="grid grid-flow-col grid-cols-8 items-center px-3 py-2 focus:shadow">
      <p className="col-span-3 text-sm text-muted-foreground">{selectLabel}</p>
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
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {selectLabel === "Assignee" ? assigneeList : statusList}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
