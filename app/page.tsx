import TasksList from "@/components/widgets/task-list";
/* import { supabase } from "@/lib/supabase/server"; */

/* const getTaskList = async () => {
  const { data } = await supabase.from("tasksList").select("*");
  return data;
}; */

export default async function Home() {
  /*   const taskList = await getTaskList(); */

  return (
    <>
      <TasksList />
    </>
  );
}

