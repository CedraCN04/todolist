import { Tables } from ".supabase";

export type Task = {
  id: number;
  name: string;
  description?: string | null;
  is_completed: boolean;
  user_id?: string;
};

export type TypeFilter = "all" | "no-completed" | "completed";

export type TaskList = Tables<"tasksList">;