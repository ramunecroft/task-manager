import {getTasks} from "@/client/api/task";

export default async function TaskPage() {
  const res = await getTasks();
  console.log(await res.json());
  return <div className="container">{/* //   <TaskBoard /> */}1</div>;
}
