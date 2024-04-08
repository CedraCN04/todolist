
/* export const newId = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]" );
    const ids = tasks.map((task:Task) => task.id);
    return Math.max(...ids, 0) + 1;
} */

export const newId = (ids: number[]) => {
    return Math.max(...ids, 0) + 1 
}