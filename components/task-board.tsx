import {TaskSection} from "@/components/task-section";
import {Button} from "@/components/ui/button";
import {FolderIcon} from "lucide-react";
import Link from "next/link";

export const TaskBoard = () => {
  return (
    <div className="w-full flex-1 flex-col">
      <header className="flex h-14 items-center border-b">
        <h1 className="text-lg font-semibold">Scrum Board</h1>
        <div className="ml-auto flex gap-4">
          <Button size="sm" variant="outline">
            Add Task
          </Button>
          <Button size="sm" variant="outline">
            Filter
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r bg-gray-100/40 p-4 dark:bg-gray-800/40">
          <h2 className="mb-2 text-sm font-semibold">Sprints</h2>
          <nav className="space-y-2">
            <Link className="flex items-center gap-2 text-sm font-medium" href="#">
              <FolderIcon className="h-4 w-4" />
              Sprint 1
            </Link>
            <Link className="flex items-center gap-2 text-sm font-medium" href="#">
              <FolderIcon className="h-4 w-4" />
              Sprint 2
            </Link>
            <Link className="flex items-center gap-2 text-sm font-medium" href="#">
              <FolderIcon className="h-4 w-4" />
              Sprint 3
            </Link>
          </nav>
        </div>
        <div className="grid h-screen flex-1 grid-flow-col grid-cols-4 gap-8">
          <TaskSection status="TO_DO" />
          <TaskSection status="IN_PROGRESS" />
          <TaskSection status="IN_REVIEW" />
          <TaskSection status="DONE" />
        </div>
      </div>
    </div>
  );
};
