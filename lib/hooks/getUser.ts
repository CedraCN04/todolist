// recupérer le user_id depuis la base de données

import { createClientServer } from "../supabase/server";

export const useGetUser = async (user_id: string) => {
  const supabase = createClientServer();
  const { data } = await supabase.from("tasksList").select();
  return data;
}