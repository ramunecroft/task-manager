import {Icons} from "@/components/icons";
import {PriorityIcon} from "@/components/task-card";
import {type Task} from "@/server/db/schema";

type TaskDetailModalHeaderProps = {
  task: Task;
};

export const TaskModalHeader = ({
  task: {priority, ticketCode, viewCount},
}: TaskDetailModalHeaderProps) => {
  return (
    <div id="tash-header">
      <div className="flex w-full flex-grow flex-row items-center justify-between">
        <div className="flex items-center justify-center space-x-2">
          <PriorityIcon level={priority} />
          <p>{ticketCode}</p>
        </div>
        <div className="mr-6 flex gap-x-2">
          <Icons.eye />
          <p>{viewCount}</p>
        </div>
      </div>
    </div>
  );
};
