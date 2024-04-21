import { Task } from "@/types/types";
import { useEffect, useState } from "react";
import { getLocalStorage, newId, saveLocalStorage } from "../functions";

export const useTask = (initialTask:Task[] = []) => {

    const [tasks, setTasks] = useState<Task[]>(initialTask);

    useEffect(() => {
      const getTasks = getLocalStorage();
      if (getTasks) {
        setTasks(getTasks);
      }
    },[]);

    const selectTask = (id: number) => {
      return id;
    };

    const newTodoId = () => {
      const ids = tasks.map((task) => task.id);
        return newId(ids)
    }

    const addTask = (name: string) => {
      if (!name) return;
      const newTask = {
        id: newTodoId(),
        name: name,
        is_completed: false,
      };
      setTasks([...tasks, newTask]);
      saveLocalStorage([...tasks, newTask]);
      return newTask;
    }

    const deleteTask = (id: number) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      saveLocalStorage(newTasks);
    }

  const updateTask = (newTask: Task) => {
    const newTasks = tasks.map((task) => {
      if (task.id === newTask.id) {
        return { ...task, ...newTask};
      }
      return task;
    });
    setTasks(newTasks);
    saveLocalStorage(newTasks);
  }

    return {
        tasks,
        addTask,
        deleteTask,
        updateTask,
        selectTask,
        newTodoId
    }
    
}