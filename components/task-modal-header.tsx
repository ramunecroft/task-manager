import {Icons} from "@/components/icons";
import {PriorityIcon} from "@/components/task-card";
import {taskModalAtom} from "@/store/task";
import {useAtomValue} from "jotai";

export const TaskModalHeader = () => {
  const taskModal = useAtomValue(taskModalAtom);
  if (!taskModal) return null;
  return (
    <div id="tash-header">
      <div className="flex w-full flex-grow flex-row items-center justify-between">
        <div className="flex items-center justify-center space-x-2">
          <PriorityIcon level={taskModal?.priority} />
          <p>{taskModal.ticketCode}</p>
        </div>
        <div className="mr-6 flex gap-x-2">
          <Icons.eye />
          <p>{taskModal.viewCount}</p>
        </div>
      </div>
    </div>
  );
};
