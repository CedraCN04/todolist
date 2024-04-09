import { Task } from "@/types/types";
import { useEffect, useState } from "react";
import { newId } from "../functions";

// externaliser le local storage 

export const useTask = (initialTask:Task[] = []) => {

    const [tasks, setTasks] = useState<Task[]>(initialTask);

    // fonction qui va récupérer le local storage
    const getLocalStorage = () => {
      const tasks = localStorage.getItem("tasks");
      if (!tasks) {
        localStorage.setItem("tasks", JSON.stringify([]));
      } else {
        setTasks(JSON.parse(tasks));
      }
    }

    // initialisation du local storage au premier rendu
    useEffect(() => {
      getLocalStorage();
    },[]);

    // fonction qui va sauvegarder le local storage
    const saveLocalStorage = (tasks: Task[]) => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const selectTask = (id: number) => {
      return id;
    };

    const newTodoId = () => {
      const ids = tasks.map((task) => task.id);
        return newId(ids)
    }

    const addTask = (title: string) => {
      if (!title) return;
      const newTask = {
        id: newTodoId(),
        title: title,
        done: false,
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