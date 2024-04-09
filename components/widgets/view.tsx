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
      <AddTask onAdd={addTask} />
      <ul className="w-3/5 my-10 flex flex-col items-center gap-4">
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

