"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddTask } from "@/components/widgets/addTask";
import { SearchBar, searchTask } from "@/components/widgets/inputSearch";
import TaskView from "@/components/widgets/taskView";
import { useTask } from "@/lib/hooks/useTask";
import { filterTasks } from "@/lib/utils-task";
import { TypeFilter } from "@/types/types";
import { useState } from "react";

export default function View() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TypeFilter>("all");

  const { addTask, updateTask, deleteTask, tasks } = useTask();

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
          className="flex flex-row p-2 justify-between items-center border border-black rounded-lg my-4 w-11/12 sm:w-[400px] lg:p-4 lg:text-sm"
          // @ts-ignore
          onClick={(e) => setFilter(e.target.value)}
        >
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all" className="text-xs">
            Toutes les tâches
          </Label>
          <RadioGroupItem value="completed" id="completed" />
          <Label htmlFor="completed" className="text-xs">
            Complétées
          </Label>
          <RadioGroupItem value="no-completed" id="no-completed" />
          <Label htmlFor="no-completed" className="text-xs">
            Non complétées
          </Label>
        </RadioGroup>
      </div>
      <AddTask onAdd={addTask} />
      <ul className="w-11/12 my-10 flex flex-col items-center gap-4 md:w-3/5">
        {filteredTasks
          .filter((task) => filterTasks(task, filter))
          .map((task) => (
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

