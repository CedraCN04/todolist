import { Task } from "@/types/types";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Input } from "../ui/input";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

// Fonction pour rechercher une tâche
export function searchTask(task: Task, searchTerm: string) {
  if (!task) {
    return [];
  }
  return task.filter((task: Task) => {
    return (
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

