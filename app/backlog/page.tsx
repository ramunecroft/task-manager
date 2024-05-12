"use client";

import {columns} from "@/app/columns";
import {DataTable} from "@/app/data-table";
import {useTaskList} from "@/hooks/use-task-list";

export default function BacklogPage() {
  const {data: taskList, isLoading} = useTaskList();

  if (!taskList) return null;
  return (
    <div className="container mt-4 flex flex-col gap-1">
      <DataTable data={taskList} columns={columns} />
    </div>
  );
}
