import { Input } from "@/components/ui/input";
import { Task } from "@/types/types";
import React, { useState } from "react";
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
    <>
      <Input
        placeholder="Modifier la tâche"
        value={title}
        onChange={handleChange}
      />
      <Button
        onClick={() => onEditTitle(title)}
        className=" bg-green-400 hover:bg-green-500 text-black"
        disabled={!title}
      >
        Modifier
      </Button>
      <Button
        onClick={() => onCancelEdit()}
        className=" bg-red-400 hover:bg-red-500 text-black"
      >
        Annuler
      </Button>
    </>
  );
}

