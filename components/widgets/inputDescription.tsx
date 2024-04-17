import { useState } from "react";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Task } from "../../types/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type DescriptionProps = {
  task: Task;
  addDescription: (description: string) => void;
};

export function Description({ task, addDescription }: DescriptionProps) {
  const [description, setDescription] = useState(task.description ?? "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="relative w-full flex flex-row justify-between items-center gap-2">
      <Input
        value={description}
        onChange={handleChange}
        placeholder="Ajoutez une description"
      />
      {description && (
        <IoClose
          onClick={() => setDescription("")}
          className="cursor-pointer absolute text-xl mx-2 right-16 top-3"
        />
      )}

      <Button
        onClick={() => addDescription(description)}
        className="bg-blue-400 hover:bg-blue-500 text-black"
      >
        {task.description ? (
          <MdModeEdit className="text-xl" />
        ) : (
          <IoAddCircleOutline className="text-2xl" />
        )}
      </Button>
    </div>
  );
}

