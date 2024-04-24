"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SearchBar, searchTask } from "@/components/widgets/inputSearch";
import { useTask } from "@/lib/hooks/useTask";
import { Task, TypeFilter } from "@/types/types";
import { useState } from "react";
import { AddTask } from "./addTask";
import TaskView from "./taskView";

type TasksListProps = {
  task: Task;
};

export default function TaskList({ task }: TasksListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TypeFilter>("all");

  const { addTask, updateTask, deleteTask, tasks, getFilteredTasks } =
    useTask(task);

  const filteredTasks = searchTask(tasks, searchTerm);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 w-full">
      <h1 className="text-2xl my-10">Ma liste de tâches</h1>
      <div className="w-full flex flex-col lg:flex-row lg:justify-around items-center lg:w-4/5">
        <div className="flex flex-row items-center my-10 w-4/5 sm:w-[400px]">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <RadioGroup
          defaultValue="all"
          className="flex flex-col p-4 gap-4 justify-between items-start border border-black rounded-lg my-4 sm:flex-row"
          // @ts-ignore
          onClick={(e) => setFilter(e.target.value)}
        >
          <div className="flex flex-row gap-2 items-center">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">Toutes les tâches</Label>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <RadioGroupItem value="completed" id="completed" />
            <Label htmlFor="completed">Complétées</Label>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <RadioGroupItem value="no-completed" id="no-completed" />
            <Label htmlFor="no-completed">Non complétées</Label>
          </div>
        </RadioGroup>
      </div>
      <AddTask onAdd={addTask} />
      <ul className="w-11/12 my-10 flex flex-col items-center gap-4 md:w-[700px]">
        {getFilteredTasks(filteredTasks, filter).map((task: Task) => (
          <TaskView
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </main>
  );
}

