import {TaskBoard} from "@/components/task-board";

export const dynamic = "force-dynamic";

export default function Home() {
  console.log("proenv", process.env);
  return (
    <div className="container">
      <TaskBoard />
    </div>
  );
}
