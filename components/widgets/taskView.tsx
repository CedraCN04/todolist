"use client";

import { cn } from "@/lib/utils";
import { Task } from "@/types/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Description } from "./inputDescription";
import { EditTitle } from "./inputEdit";

type TaskViewProps = {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
};

export default function TaskView({
  task,
  updateTask,
  deleteTask,
}: TaskViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleAddDescription = (description: string) => {
    const newTask = {
      ...task,
      description,
    };
    updateTask(newTask);
    setIsEditing(false);
  };

  const editTaskTitle = (title: string) => {
    const newTask = {
      ...task,
      title,
    };
    updateTask(newTask);
    setIsEditing(false);
  };

  return (
    <li
      className={cn(
        "text-base border flex flex-col items-center border-gray-500 rounded-lg p-4 w-full lg:w-3/5",
        task.done ? "line-through" : ""
      )}
    >
      <div className="w-full flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-row justify-between items-center">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => updateTask({ ...task, done: !task.done })}
            className="mr-4 cursor-pointer"
          />
          <div className="flex flex-col gap-2">
            {task.title}
            {task.description && (
              <span className="text-sm text-gray-600">{task.description}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between gap-4 self-center w-2/5">
          <Button
            className="bg-blue-400 hover:bg-blue-500 text-black"
            onClick={() => setIsEditing(true)}
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
      {isEditing && (
        <>
          <div className="flex flex-row items-center justify-around w-full gap-2 my-4">
            <EditTitle
              task={task}
              onEditTitle={editTaskTitle}
              onCancelEdit={() => setIsEditing(false)}
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <Description task={task} addDescription={handleAddDescription} />
          </div>
        </>
      )}
    </li>
  );
}

