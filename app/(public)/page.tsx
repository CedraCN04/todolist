import TasksList from "@/components/widgets/task-list";
import { useGetTaskList } from "@/lib/hooks/get";
import { useGetUser } from "@/lib/hooks/getUser";

export default async function Home() {
  const userId = useGetUser("user_id");
  const taskList = await useGetTaskList(userId);

  return (
    <>
      <TasksList taskList={taskList} />
    </>
  );
}

