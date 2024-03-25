import { Task } from "@/types/types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// ajouter la tâche créée dans le local storage
// effacer la tache du local storage lorsqu'on la supprime
// modifier la tâche du local storage lorsqu'on la modifie

export const useTask = (initialTask:Task[] = []) => {

    const [tasks, setTasks] = useState<Task[]>(initialTask);
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

    const selectTask = (id: string) => {
      setCurrentTaskId(id);
    };

    const saveTask = (tasks: Task[]) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const getTask = () => {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    }

    let taskList = getTask() || [];

    const addTask = (title: string) => {
      if (!title) return;
      const newTask = {
        id: uuidv4(),
        title: title,
        done: false,
      };
      const updatedTask = [...taskList, newTask];
      setTasks(updatedTask);
      saveTask(updatedTask);
    }

    const deleteTask = (id: string) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }

    const editTask = (title: string) => {
      const newTasks = tasks.map((task) => {
        if (task.id === currentTaskId) {
          return { ...task, title: title };
        }
        return task;
      });
      setTasks(newTasks);
      setCurrentTaskId(null);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }

    const addDescription = (description: string) => {
      const newTasks = tasks.map((task) => {
        if (task.id === currentTaskId) {
          return { ...task, description: description };
        }
        return task;
      });
      setTasks(newTasks);
      setCurrentTaskId(null);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }

    const toggleTaskDone = (id: string) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      });
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
    useEffect(() => {
      const loadedTasks = getTask() || [];
      setTasks(loadedTasks);
    }, []);

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