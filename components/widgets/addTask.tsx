"use client";

import { useAddTask } from "@/lib/hooks/addTask";
import { Task } from "@/types/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type AddTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const AddTask = ({ setTasks }: AddTaskProps) => {
  const { title, setTitle, addNewTask } = useAddTask(setTasks);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <form
      className="flex flex-row items-center justify-around w-3/5"
      onSubmit={addNewTask}
    >
      <Input
        placeholder="Ajoutez une tâche"
        value={title}
        onChange={handleChange}
      />
      <Button
        className="mx-4 bg-green-400 hover:bg-green-500 text-black"
        disabled={!title}
      >
        Ajoutez
      </Button>
    </form>
  );
};

