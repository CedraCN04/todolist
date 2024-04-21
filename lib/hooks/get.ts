import { createClientServer } from "@/lib/supabase/server";

export const useGetTaskList = async () => {
  const supabase = createClientServer();
  const { data } = await supabase.from("tasksList").select()
  return data;
};