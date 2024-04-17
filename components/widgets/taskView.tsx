"use client";

import { cn } from "@/lib/utils";
import { Task } from "@/types/types";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
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
        "text-base border flex flex-col items-center border-gray-500 rounded-lg p-4 w-full",
        task.done ? "line-through" : ""
      )}
    >
      <div className="w-full flex flex-row items-center justify-between">
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
              <span className="text-sm text-gray-600 w-4/5">
                {task.description}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between self-center w-[120px] gap-2">
          <Button
            className="bg-blue-400 hover:bg-blue-500 text-black"
            onClick={() => setIsEditing(true)}
          >
            <MdModeEdit className="text-xl" />
          </Button>
          <Button
            className="bg-red-400 hover:bg-red-500 text-black"
            onClick={() => deleteTask(task.id)}
          >
            <RxCrossCircled className="text-xl" />
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

