"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

type Task = {
  id: string;
  title: string;
  desciption?: string;
  done: boolean;
};

// rechercher par le nom
// créer un input pour rechercher le nom
// créer un état pour l'input de recherche
// récupérer les informations de l'input puis les stocker dans l'état
// créer une fonction qui gère le déclenchement de la recherche et retire du DOM les tâches qui ne correspondent pas à cette recherche

// fonction de recherche: filtrer mes tâches, si le titre de la tâche contient la valeur de l'input, alors je la garde, sinon je la retire

// afficher les todos suivant des critères =>  tout | complété | non completé

export default function Home() {
  const [title, setTitle] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTitle, setEditTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const removeTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const editTask = (id: string) => {
    setCurrentTaskId(id);
    const newTask = tasks.find((task) => task.id === id);
    setEditTitle(newTask?.title ?? "");
  };

  const editTaskTitle = () => {
    const newTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return { ...task, title: editTitle };
      }
      return task;
    });
    setTasks(newTasks);
    setCurrentTaskId(null);
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
      <div className="flex flex-row items-center gap-4 my-10">
        <FaSearch className="h-8 w-8" />
        <Input
          placeholder="Rechercher une tâche"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
      <ul className="w-3/5 my-10 flex flex-col items-center gap-4">
        {tasks
          .filter((task) => task.title.toLowerCase().includes(searchTerm))
          .map((task, id) => (
            <li
              key={id}
              className={cn(
                "text-base border flex flex-col items-center border-gray-500 rounded-lg p-4 w-full",
                task.done ? "line-through" : ""
              )}
            >
              <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row justify-between">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTaskDone(task.id)}
                    className="mr-4 cursor-pointer"
                  />
                  {task.title}
                </div>
                <div className="flex flex-row justify-between gap-4">
                  <Button
                    className="bg-blue-400 hover:bg-blue-500"
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
              </div>
              {task.id === currentTaskId && (
                <div className="flex flex-row items-center justify-around w-3/5">
                  <Input
                    placeholder="Modifier la tâche"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <Button
                    onClick={() => editTaskTitle()}
                    className="mx-4 bg-green-400 hover:bg-green-500 text-black"
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => setCurrentTaskId(null)}
                    className="mx-4 bg-red-400 hover:bg-red-500 text-black"
                  >
                    Annuler
                  </Button>
                </div>
              )}
            </li>
          ))}
      </ul>
    </main>
  );
}

