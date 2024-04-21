import { createClientServer } from "@/lib/supabase/server";

export const getTaskList = async (user_id:string) => {
  const supabase = createClientServer();
  const { data } = await supabase.from("tasksList").select("*").eq("user_id", user_id);
  return data;
};