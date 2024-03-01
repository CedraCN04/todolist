"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

// intégrer un système de sous-tâches

type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
};

type TypeFilter = "all" | "no-completed" | "completed";

export default function Home() {
  const [title, setTitle] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTitle, setEditTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TypeFilter>("all");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const searchByNameAndDescription = (task: Task) => {
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const handleAddDescription = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, description: description };
      }
      return task;
    });
    setTasks(newTasks);
    setCurrentTaskId(null);
  };

  const filterTasks = (task: Task) => {
    if (filter === "completed") {
      return task.done;
    }
    if (filter === "no-completed") {
      return !task.done;
    }
    return true;
  };

  const removeTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const editTask = (id: string) => {
    setCurrentTaskId(id);
    const newTask = tasks.find((task) => task.id === id);
    setEditTitle(newTask?.title ?? "");
    setDescription(newTask?.description ?? "");
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
    if (title === "") {
      setErrorMessage("Veuillez ajouter une tâche");
      return;
    }
    const task = {
      id: uuidv4(),
      title: title,
      done: false,
    };
    setTasks([...tasks, task]);
    setTitle("");
    setErrorMessage("");
  };

  useEffect(() => {
    if (title) {
      setErrorMessage("");
    }
  }, [title]);

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
      <div className="flex flex-row justify-around items-center w-4/5">
        <div className="flex flex-row items-center gap-4 my-10">
          <FaSearch className="h-8 w-8" />
          <Input
            className="w-full"
            placeholder="Rechercher une tâche"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoClose
            onClick={() => setSearchTerm("")}
            className="h-10 w-10 cursor-pointer"
          />
        </div>
        <RadioGroup
          defaultValue="all"
          className="flex flex-row justify-between gap-2 items-center border border-black rounded-lg p-4 my-4"
          // @ts-ignore
          onClick={(e) => setFilter(e.target.value)}
        >
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all">Toutes les tâches</Label>
          <RadioGroupItem value="completed" id="completed" />
          <Label htmlFor="completed">Complétées</Label>
          <RadioGroupItem value="no-completed" id="no-completed" />
          <Label htmlFor="no-completed">Non complétées</Label>
        </RadioGroup>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form
        className="flex flex-row items-center justify-around w-3/5"
        onSubmit={addTask}
      >
        <Input
          placeholder="Ajoutez une tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errorMessage && "border-red-500"}
        />
        <Button className="mx-4 bg-green-400 hover:bg-green-500 text-black">
          Ajoutez
        </Button>
      </form>
      <ul className="w-3/5 my-10 flex flex-col items-center gap-4">
        {tasks
          .filter(filterTasks)
          .filter(searchByNameAndDescription)
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
                  <div className="flex flex-col gap-2">
                    {task.title}
                    {description && (
                      <span className="text-sm text-gray-600">
                        {task.description}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-4 ">
                  <Button
                    className="bg-blue-400 hover:bg-blue-500 text-black"
                    onClick={() => editTask(task.id)}
                  >
                    Editer
                  </Button>
                  <Button
                    className="bg-red-400 hover:bg-red-500 text-black"
                    onClick={() => removeTask(task.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
              {task.id === currentTaskId && (
                <div className="flex flex-row items-center justify-around w-full gap-2 my-4">
                  <Input
                    placeholder="Modifier la tâche"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <Button
                    onClick={() => editTaskTitle()}
                    className=" bg-green-400 hover:bg-green-500 text-black"
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => setCurrentTaskId(null)}
                    className=" bg-red-400 hover:bg-red-500 text-black"
                  >
                    Annuler
                  </Button>
                </div>
              )}
              {task.id === currentTaskId && (
                <div className="flex flex-row justify-between gap-2 w-full">
                  <Input
                    placeholder="Ajouter une description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button
                    onClick={() => handleAddDescription(currentTaskId)}
                    className="bg-blue-400 hover:bg-blue-500 text-black"
                  >
                    {task.description ? "Modifier" : "Ajouter"}
                  </Button>
                  <IoClose
                    onClick={() => setDescription("")}
                    className="h-10 w-10 cursor-pointer"
                  />
                </div>
              )}
            </li>
          ))}
      </ul>
    </main>
  );
}

