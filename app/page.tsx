"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddTask } from "@/components/widgets/addTask";
import { SearchBar, searchTask } from "@/components/widgets/inputSearch";
import TaskView from "@/components/widgets/taskView";
import { useTask } from "@/lib/hooks/useTask";
import { filterTasks } from "@/lib/utils-task";
import { Task, TypeFilter } from "@/types/types";
import { useEffect, useState } from "react";

// déplacer toute la logique de la page et les composants dans un composant externe (pour que la page soit en server component)

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TypeFilter>("all");
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (!tasks) {
      localStorage.setItem("tasks", JSON.stringify([]));
    } else {
      setTaskList(JSON.parse(tasks));
    }
  }, []);

  const { addTask } = useTask();

  const filteredTasks = searchTask(taskList, searchTerm);

  const handleAddTask = (title: string) => {
    const newTask = addTask(title);
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTaskList(tasks);
  };

  // supprimer une tâche du local storage
  const handleDeleteTask = (id: number) => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.filter((task: Task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskList(updatedTasks);
  };

  // Mettre à jour une tâche + ajout d'une description dans le local storage
  const handleUpdateTask = (updatedTask: Task) => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const taskIndex = tasks.findIndex(
      (task: Task) => task.id === updatedTask.id
    );
    tasks[taskIndex] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTaskList(tasks);
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
        {taskList &&
          filteredTasks
            .filter((task) => filterTasks(task, filter))
            .map((task) => (
              <TaskView
                key={task.id}
                task={task}
                updateTask={handleUpdateTask}
                deleteTask={handleDeleteTask}
              />
            ))}
      </ul>
    </main>
  );
}

