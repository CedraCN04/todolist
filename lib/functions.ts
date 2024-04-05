import { Task } from "@/types/types";

export const newId = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]" );
    const ids = tasks.map((task:Task) => task.id);
    return Math.max(...ids, 0) + 1;
}