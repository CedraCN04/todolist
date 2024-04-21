import { createClientServer } from "@/lib/supabase/server";
import { TaskList } from "@/types/types";
import { useGetUser } from "./getUser";

export const useGetTaskList = async (user_id:TaskList) => {
  const userId = useGetUser(user_id);
  const supabase = createClientServer();
  const { data } = await supabase.from("tasksList").select().eq("user_id", userId);
  return data;
};