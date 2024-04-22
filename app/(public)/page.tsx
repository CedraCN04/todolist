import TasksList from "@/components/widgets/task-list";
import { useGetTaskList } from "@/lib/task/getTask";

export default async function Home() {
  const taskList = await useGetTaskList();

  return (
    <>
      <TasksList task={taskList} />
    </>
  );
}

