import { Task, TypeFilter } from "@/types/types";
import { useState } from "react";
import { newId } from "../functions";
import { addTaskToDataBase, deleteTaskInDataBase, updateTaskinDatabase } from "../task/action";
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
      const newTask = {
        id: newTodoId(),
        name,
        is_completed: false,
      }
      const errorDatabase = await addTaskToDataBase(name);
      if (errorDatabase) return errorDatabase.message
      setTasks([...tasks, newTask]);
      return newTask;
    }

    const deleteTask = async(id: number) => {
      const errorDatabase = await deleteTaskInDataBase(id);
      if (errorDatabase) return errorDatabase.message
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    }

  const updateTask = async(newTask: Task) => {
    const errorDatabase = await updateTaskinDatabase(newTask);
    if(errorDatabase) return errorDatabase.message
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
        newTodoId,
        getFilteredTasks
    }
    
}