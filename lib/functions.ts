export const newId = (ids: number[]) => {
    return Math.max(...ids, 0) + 1 
}