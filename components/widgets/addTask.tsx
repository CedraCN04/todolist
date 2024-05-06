"use client";

import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
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
    <div className="flex flex-row items-center justify-around w-11/12 lg:w-[700px]">
      <Input
        placeholder="Ajoutez une tâche"
        value={title}
        onChange={handleChange}
        className="my-4"
      />
      <Button
        onClick={handleAdd}
        className="mx-4 bg-green-400 hover:bg-green-500 text-black"
        disabled={!title}
      >
        <IoAddCircleOutline className="text-2xl" />
      </Button>
    </div>
  );
};

