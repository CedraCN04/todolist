"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type AddTaskProps = {
  onAdd: (title: string) => void;
};

export const AddTask = ({ onAdd }: AddTaskProps) => {
  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAdd = () => {
    onAdd(title);
    setTitle("");
  };

  return (
    <div className="flex flex-row items-center justify-around w-3/5">
      <Input
        placeholder="Ajoutez une tâche"
        value={title}
        onChange={handleChange}
      />
      <Button
        onClick={handleAdd}
        className="mx-4 bg-green-400 hover:bg-green-500 text-black"
        disabled={!title}
      >
        Ajoutez
      </Button>
    </div>
  );
};

