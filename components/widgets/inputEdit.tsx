import { Input } from "@/components/ui/input";
import { SearchBarProps, Task } from "@/types/types";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";

type TitleProps = {
  task: Task;
  onEditTitle: (title: string) => void;
  onCancelEdit: () => void;
};

// ajouter les boutons pour ajouter/modifier la description
// améliorer et externaliser l'ajout de tâche

// Input edition du titre
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

// Fonction pour rechercher une tâche
export function searchTask(task: Task[], searchTerm: string) {
  return task.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
}

// Input de recherche
export function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="relative w-full flex items-center">
      <FaSearch className="absolute left-3 top-3" />
      <Input
        className="w-11/12 px-10"
        placeholder="Rechercher une tâche"
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && (
        <IoClose
          onClick={() => setSearchTerm("")}
          className="cursor-pointer absolute right-8 top-3"
        />
      )}
    </div>
  );
}

