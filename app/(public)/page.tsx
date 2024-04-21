import TasksList from "@/components/widgets/task-list";
import { getTaskList } from "@/lib/hooks/get";

export default async function Home() {
  const taskList = await getTaskList();

  return (
    <>
      <TasksList taskList={taskList} />
    </>
  );
}

