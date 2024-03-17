import { Task } from '@/types/types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useAddTask = (setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  const [title, setTitle] = useState("");

  const addNewTask = (e:React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const newTask = {
      id: uuidv4(),
      title: title,
      done: false,
    };
    setTasks(tasks => [...tasks, newTask]);
    setTitle("");
  }
  return {
    title,
    setTitle,
    addNewTask,
  }
}