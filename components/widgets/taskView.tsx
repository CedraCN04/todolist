"use client";

import { cn } from "@/lib/utils";
import { TaskList } from "@/types/types";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { Button } from "../ui/button";
import { Description } from "./inputDescription";
import { EditTitle } from "./inputEdit";

type TaskViewProps = {
  //task: Task;
  taskList: TaskList;
  updateTask: (taskList: TaskList) => void;
  deleteTask: (id: number) => void;
};

export default function TaskView({
  taskList,
  updateTask,
  deleteTask,
}: TaskViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleAddDescription = (description: string) => {
    const newTask = {
      ...taskList,
      description,
    };
    updateTask(newTask);
    setIsEditing(false);
  };

  const editTaskTitle = (name: string) => {
    const newTask = {
      ...taskList,
      name,
    };
    updateTask(newTask);
    setIsEditing(false);
  };

  return (
    <li
      className={cn(
        "text-base border flex flex-col items-center border-gray-500 rounded-lg p-4 w-full",
        taskList.is_completed ? "line-through" : ""
      )}
    >
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-row justify-between items-center">
          <input
            type="checkbox"
            checked={taskList.is_completed}
            onChange={() =>
              updateTask({ ...taskList, is_completed: !taskList.is_completed })
            }
            className="mr-4 cursor-pointer"
          />
          <div className="flex flex-col gap-2">
            {taskList.name}
            {taskList.description && (
              <span className="text-sm text-gray-600 w-4/5">
                {taskList.description}
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
            onClick={() => deleteTask(taskList.id)}
          >
            <RxCrossCircled className="text-xl" />
          </Button>
        </div>
      </div>
      {isEditing && (
        <>
          <div className="flex flex-row items-center justify-around w-full gap-2 my-4">
            <EditTitle
              task={taskList}
              onEditTitle={editTaskTitle}
              onCancelEdit={() => setIsEditing(false)}
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <Description
              task={taskList}
              addDescription={handleAddDescription}
            />
          </div>
        </>
      )}
    </li>
  );
}

