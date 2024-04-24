import { createClientServer } from "@/lib/supabase/server";

export const getTask = async () => {
  const supabase = createClientServer();
  const { data } = await supabase.from("Task").select()
  
  return data;
};