
export type Task = {
  id: number;
  title: string;
  description?: string;
  done: boolean;
};

export type TypeFilter = "all" | "no-completed" | "completed";