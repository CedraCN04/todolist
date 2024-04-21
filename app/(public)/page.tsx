import TasksList from "@/components/widgets/task-list";
import { useGetTaskList } from "@/lib/hooks/get";

export default async function Home() {
  const taskList = await useGetTaskList();

  return (
    <>
      <TasksList taskList={taskList} />
    </>
  );
}

