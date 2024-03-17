import {Icons} from "@/components/icons";
import {PriorityIcon} from "@/components/task-card";
import {taskModalStateAtom} from "@/store/task";
import {useAtomValue} from "jotai";

export const TaskModalHeader = () => {
  const taskModalState = useAtomValue(taskModalStateAtom);
  if (!taskModalState) return null;
  return (
    <div id="tash-header">
      <div className="flex w-full flex-grow flex-row items-center justify-between">
        <div className="flex items-center justify-center space-x-2">
          <PriorityIcon level={taskModalState?.priority} />
          <p>{taskModalState.ticketCode}</p>
        </div>
        <div className="mr-6 flex gap-x-2">
          <Icons.eye />
          <p>{taskModalState.viewCount}</p>
        </div>
      </div>
    </div>
  );
};
