import { Input } from "@/components/ui/input";
import { Task } from "@/types/types";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Button } from "../ui/button";

type TitleProps = {
  task: Task;
  onEditTitle: (title: string) => void;
  onCancelEdit: () => void;
};

export function EditTitle({ task, onEditTitle, onCancelEdit }: TitleProps) {
  const [title, setTitle] = useState(task.title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-row items-center gap-2 w-full">
      <div className="relative w-full">
        <Input
          placeholder="Modifier la tâche"
          value={title}
          onChange={handleChange}
        />
        {title && (
          <IoClose
            onClick={() => setTitle("")}
            className="cursor-pointer absolute top-3 right-2 text-lg"
          />
        )}
      </div>
      <Button
        onClick={() => onEditTitle(title)}
        className=" bg-green-400 hover:bg-green-500 text-black"
        disabled={!title}
      >
        <MdModeEdit className="text-xl" />
      </Button>
    </div>
  );
}

