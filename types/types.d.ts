export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
};

export type TypeFilter = "all" | "no-completed" | "completed";