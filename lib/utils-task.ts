import { Task, TypeFilter } from "@/types/types";

  export const filterTasks = (task: Task, filter: TypeFilter) => {
    if (filter === "completed") {
      return task.is_completed;
    }
    if (filter === "no-completed") {
      return !task.is_completed;
    }
    return true;
  };