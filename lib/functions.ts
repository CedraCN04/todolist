import { Task } from "@/types/types";

export const newId = (ids: number[]) => {
    return Math.max(...ids, 0) + 1 
}

// fonction qui va récupérer le local storage
export const getLocalStorage = (setTasks: (tasks: Task[]) => void) => {
    const tasks = localStorage.getItem("tasks");
    if (!tasks) {
      localStorage.setItem("tasks", JSON.stringify([]));
    } else {
      setTasks(JSON.parse(tasks));
    }
}

  // fonction qui va sauvegarder le local storage
export const saveLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}