import {TaskBoard} from "@/components/task-board";

export default function Home() {
  console.log("proenv", process.env);
  return (
    <div className="container">
      <TaskBoard />
    </div>
  );
}
