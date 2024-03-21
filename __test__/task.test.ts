// describe => add
// cas 1
// cas 2
// describe => update

import { renderHook } from "@testing-library/react-hooks";
import { v4 as uuidv4 } from "uuid";
import { useTask } from "../lib/hooks/useTask";


// initialise
// fonctionnalités

const task1 = {
    id : uuidv4(),
    title: "task1",
    done: false,
}

const task2 = {
        id : uuidv4(),
        title: "task2",
        done: false,
    }

describe("init tasks", () => {
  it("init tasks with no values", () => {
    const { result } = renderHook(() => useTask());
    expect(result.current.tasks).toEqual([]);
  });
    it("init tasks with one task", () => {
        const { result } = renderHook(() => useTask([task1]));
        expect(result.current.tasks).toEqual([task1])
    });
  it("init tasks with tow tasks", () => {
    const { result } = renderHook(() => useTask([task1, task2]));
    expect(result.current.tasks).toEqual([task1, task2])
  })
});

describe("add task", () => {
  it("add task do nothing if title is empty or null", () => {
    const { result } = renderHook(() => useTask());
    result.current.addTask("");
    expect(result.current.tasks).toEqual([]);
  });
  it("add task with a title", () => {
    const { result } = renderHook(() => useTask());
    result.current.tasks = [task1];
    expect(result.current.tasks).toEqual([task1]);
  });
  it("task is created with unique id, title and done", () => {
    const { result } = renderHook(() => useTask());
    result.current.addTask("task1");
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
  });
  it("task added to a list", () => {
    const { result } = renderHook(() => useTask());
    result.current.addTask("task1");
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
  })
})
