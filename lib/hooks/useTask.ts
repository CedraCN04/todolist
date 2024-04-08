import { Task } from "@/types/types";
import { useState } from "react";
import { newId } from "../functions";


// mettre la logique du local storage dans ce hook

export const useTask = (initialTask:Task[] = []) => {

    const [tasks, setTasks] = useState<Task[]>(initialTask);

    const selectTask = (id: number) => {
      return id;
    };

    const newTodoId = () => {
      tasks.map((task) => task.id)
        return newId()
    }

    const addTask = (title: string) => {
      if (!title) return;
      const newTask = {
        id: newTodoId(),
        title: title,
        done: false,
      };
      setTasks([...tasks, newTask]);
      return newTask
    }

    const deleteTask = (id: number) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    }

  const updateTask = (newTask: Task) => {
    const newTasks = tasks.map((task) => {
      if (task.id === newTask.id) {
        return { ...task, ...newTask};
      }
      return task;
    });
    setTasks(newTasks);
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