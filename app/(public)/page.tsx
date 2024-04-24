import TasksList from "@/components/widgets/task-list";
import { getTask } from "@/lib/task/getTask";

export default async function Home() {
  const taskList = await getTask();

  return (
    <>
      <TasksList task={taskList} />
    </>
  );
}

