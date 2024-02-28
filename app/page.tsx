"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Task = {
  id: string;
  title: string;
  desciption?: string;
  done: boolean;
};

export default function Home() {
  const [title, setTitle] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openEditTask, setIsOpenEditTask] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const removeTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const editTask = (id: string) => {
    setIsOpenEditTask(true);
    setCurrentTaskId(id);
  };

  const editTaskTitle = (id: string, newTitle: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(newTasks);
    setIsOpenEditTask(false);
    setTitle("");
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      id: uuidv4(),
      title: title,
      done: false,
    };
    setTasks([...tasks, task]);
    setTitle("");
  };

  const toggleTaskDone = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-20">
      <h1 className="text-2xl my-10">Ma liste de tâches</h1>
      <form
        className="flex flex-row items-center justify-around w-3/5"
        onSubmit={addTask}
      >
        <Input
          placeholder="Ajouter une tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button className="mx-4 bg-green-400 hover:bg-green-500 text-black">
          Ajoutez
        </Button>
      </form>
      <ul className="w-3/5 my-10 flex flex-col justify-between items-center">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`text-base border flex flex-row justify-between items-center border-gray-500 rounded-lg p-4 my-4 w-full ${
              task.done ? "line-through" : ""
            }`}
          >
            <div className="flex flex-row items-center justify-between">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTaskDone(task.id)}
                className="mr-4"
              />
              {task.title}
            </div>
            <div className="flex-flex-row justify-between items-center">
              <Button
                className="bg-blue-400 hover:bg-blue-500 mx-4"
                onClick={() => editTask(task.id)}
              >
                Editer
              </Button>
              <Button
                className="bg-red-400 hover:bg-red-500"
                onClick={() => removeTask(task.id)}
              >
                Supprimer
              </Button>
            </div>
          </li>
        ))}
        {openEditTask && (
          <div className="flex flex-row items-center justify-around w-3/5">
            <Input
              placeholder="Modifier la tâche"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              onClick={() => editTaskTitle(tasks[0].id, title)}
              className="mx-4 bg-green-400 hover:bg-green-500 text-black"
            >
              Modifier
            </Button>
          </div>
        )}
      </ul>
    </main>
  );
}

