import { Task, TypeFilter } from "@/types/types";
import { useState } from "react";
import { newId } from "../functions";
import { addTaskToDataBase } from "../task/action";
import { filterTasks } from "../utils-task";

export const useTask = (initialTask:Task[] = []) => {

    const [tasks, setTasks] = useState<Task[]>(initialTask);

    const getFilteredTasks = (filteredTasks: Task[], filter: TypeFilter) => {
      return filteredTasks.filter((initialTask: Task) => filterTasks(initialTask, filter));
    };

    /* useEffect(() => {
      const getTasks = getLocalStorage();
      if (getTasks) {
        setTasks(getTasks);
      }
    },[]); */

    const selectTask = (id: number) => {
      return id;
    };

    const newTodoId = () => {
      const ids = tasks.map((task) => task.id);
        return newId(ids)
    }

    const addTask = async(name: string) => {
      //if (!name) return;
      const newTask = {
        id: newTodoId(),
        name: name,
        is_completed: false,
      };
      const saveDatabase = await addTaskToDataBase(name);
      if (saveDatabase) {
        setTasks([...tasks, newTask]);
        return saveDatabase
      }
      //saveLocalStorage([...tasks, newTask]);
      return newTask;
    }

    const deleteTask = (id: number) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      //saveLocalStorage(newTasks);
    }

  const updateTask = (newTask: Task) => {
    const newTasks = tasks.map((task) => {
      if (task.id === newTask.id) {
        return { ...task, ...newTask};
      }
      return task;
    });
    setTasks(newTasks);
    //saveLocalStorage(newTasks);
  }

    return {
        tasks,
        addTask,
        deleteTask,
        updateTask,
        selectTask,
        newTodoId,
        getFilteredTasks
    }
    
}