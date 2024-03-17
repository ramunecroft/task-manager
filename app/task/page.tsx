import {TaskBoard} from "@/components/task-board";
import {type Metadata} from "next";

export const metadata: Metadata = {
  title: "Task Board",
};

export default function TaskPage() {
  return (
    <div className="container">
      <TaskBoard />
    </div>
  );
}
