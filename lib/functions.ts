import { Task } from "@/types/types"

export const newId = (ids: number[]) => {
    return Math.max(...ids, 0) + 1 
}

export const idDataBase = (tasks: Task[]) => {
    return tasks.map((task) => task.id)
}

/* 
// fonction qui va récupérer le local storage
export const getLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem("tasks")
  if (!tasks) return []
    return JSON.parse(tasks)
}

// fonction qui va sauvegarder le local storage
export const saveLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
} */