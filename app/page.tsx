"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddTask } from "@/components/widgets/addTask";
import { Description } from "@/components/widgets/inputDescription";
import { EditTitle } from "@/components/widgets/inputEdit";
import { SearchBar, searchTask } from "@/components/widgets/inputSearch";
import { useTask } from "@/lib/hooks/useTask";
import { cn } from "@/lib/utils";
import { filterTasks } from "@/lib/utils-task";
import { TypeFilter } from "@/types/types";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TypeFilter>("all");

  const {
    tasks,
    addTask,
    deleteTask,
    editTask,
    addDescription,
    toggleTaskDone,
    currentTaskId,
    setCurrentTaskId,
    selectTask,
  } = useTask();

  const filteredTasks = searchTask(tasks, searchTerm);

  const handleAddDescription = (description: string) => {
    if (!currentTaskId) return;
    addDescription(description);
    setCurrentTaskId(null);
  };

  const editTaskTitle = (title: string) => {
    if (!currentTaskId) return;
    editTask(title);
    setCurrentTaskId(null);
  };

  const handleAddTask = (title: string) => {
    addTask(title);
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
      <AddTask onAdd={handleAddTask} />
      <ul className="w-3/5 my-10 flex flex-col items-center gap-4">
        {filteredTasks
          .filter((task) => filterTasks(task, filter))
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
                    onClick={() => deleteTask(task.id)}
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

