export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
};

export type TypeFilter = "all" | "no-completed" | "completed";

export type TitleProps = {
  task: Task;
  setEditTitle: (title: string) => void;
}

export type DescriptionProps = {
  description: string;
  setDescription: (description: string) => void;
}

export type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}