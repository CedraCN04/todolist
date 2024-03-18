import { Task, TypeFilter } from "@/types/types";

  export const filterTasks = (task: Task, filter: TypeFilter) => {
    if (filter === "completed") {
      return task.done;
    }
    if (filter === "no-completed") {
      return !task.done;
    }
    return true;
  };