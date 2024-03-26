import { Task } from "@/types/types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useTask = (initialTask:Task[] = []) => {

    const [tasks, setTasks] = useState<Task[]>(initialTask);
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

    const selectTask = (id: string) => {
      setCurrentTaskId(id);
    };

    const addTask = (title: string) => {
      if (!title) return;
      const newTask = {
        id: uuidv4(),
        title: title,
        done: false,
      };
      setTasks([...tasks, newTask]);
    }

    const deleteTask = (id: string) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    }

  const editTask = (title: string) => {
    // faire quelque chose avant d'éditer
    // si pas de selection => return
    // si pas de selection => return une valeur
    if (!currentTaskId) return;
      const newTasks = tasks.map((task) => {
        if (task.id === currentTaskId) {
          return { ...task, title: title };
        }
        return task;
      });
      setTasks(newTasks);
      setCurrentTaskId(null);
    }

    const addDescription = (description: string) => {
      if (!currentTaskId) return;
      const newTasks = tasks.map((task) => {
        if (task.id === currentTaskId) {
          return { ...task, description: description };
        }
        return task;
      });
      setTasks(newTasks);
      setCurrentTaskId(null);
    }

    const toggleTaskDone = (id: string) => {
      if (!currentTaskId) return;
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      });
      setTasks(newTasks);
    }

    return {
        tasks,
        addTask,
        deleteTask,
        editTask,
        addDescription,
        toggleTaskDone,
        currentTaskId,
        setCurrentTaskId,
        selectTask,
    }
    
}