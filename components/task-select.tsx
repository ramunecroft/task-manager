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
import {statuses, type Status} from "@/config/docs";
import React from "react";

type TaskSelectProps = {
  selectLabel: string;
  contentLabel: string;
};

export const TaskSelect = ({selectLabel, contentLabel}: TaskSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null);
  return (
    <div className="grid grid-flow-col grid-cols-8 items-center px-3 py-2 focus:shadow">
      <p className="col-span-3 text-sm text-muted-foreground">{selectLabel}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-start">
            {selectedStatus ? (
              <>{selectedStatus.label}</>
            ) : (
              <p className="text-muted-foreground">{contentLabel}</p>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map(status => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={value => {
                      setSelectedStatus(
                        statuses.find(priority => priority.value === value) || null
                      );
                      setOpen(false);
                    }}>
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
