"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddTask } from "@/components/widgets/addTask";
import { Description } from "@/components/widgets/inputDescription";
import { EditTitle } from "@/components/widgets/inputEdit";
import { SearchBar, searchTask } from "@/components/widgets/inputSearch";
import { cn } from "@/lib/utils";
import { Task, TypeFilter } from "@/types/types";
import { useState } from "react";

// ajout de tâche dans un composant à part
// commencer à créer des hooks customs (ajout de tâches)

export default function Home() {
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TypeFilter>("all");

  const filteredTasks = searchTask(tasks, searchTerm);

  const filterTasks = (task: Task) => {
    if (filter === "completed") {
      return task.done;
    }
    if (filter === "no-completed") {
      return !task.done;
    }
    return true;
  };

  const handleAddDescription = (description: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return { ...task, description: description };
      }
      return task;
    });
    setTasks(newTasks);
    setCurrentTaskId(null);
  };

  const removeTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const selectTask = (id: string) => {
    setCurrentTaskId(id);
  };

  const editTaskTitle = (title: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return { ...task, title: title };
      }
      return task;
    });
    setTasks(newTasks);
    setCurrentTaskId(null);
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
      <div className="flex flex-row justify-around items-center w-4/5">
        <div className="flex flex-row items-center gap-4 my-10">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
      <AddTask setTasks={setTasks} />
      <ul className="w-3/5 my-10 flex flex-col items-center gap-4">
        {filteredTasks.filter(filterTasks).map((task, id) => (
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
                  {task.description && (
                    <span className="text-sm text-gray-600">
                      {task.description}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between gap-4 ">
                <Button
                  className="bg-blue-400 hover:bg-blue-500 text-black"
                  onClick={() => selectTask(task.id)}
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
                <EditTitle
                  task={task}
                  onEditTitle={editTaskTitle}
                  onCancelEdit={() => setCurrentTaskId(null)}
                />
              </div>
            )}
            {task.id === currentTaskId && (
              <div className="flex flex-row justify-between items-center w-full">
                <Description
                  task={task}
                  addDescription={handleAddDescription}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

