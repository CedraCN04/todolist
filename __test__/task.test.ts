import { renderHook } from "@testing-library/react-hooks";
import { v4 as uuidv4 } from "uuid";
import { useTask } from "../lib/hooks/useTask";
import { Task } from "../types/types";


// initialise
// fonctionnalités

const task1: Task = {
    id: uuidv4(),
    title: "task1",
    done: false,
}

const task2: Task = {
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
  it("task is created with unique id, title and done", () => {
    const { result } = renderHook(() => useTask());
    result.current.addTask("task1");
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
  });
  it("task added to a list", () => {
    const { result } = renderHook(() => useTask());
    result.current.addTask("task1");
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
  });
})

describe("delete task", () => {
  it("delete task with id", () => {
    const {result} = renderHook(() => useTask([task1]));
    result.current.deleteTask(task1.id);
    expect(result.current.tasks).toEqual([]);
  });
  it("task deleted from task list", () => {
    const {result}= renderHook(() => useTask([task1, task2]));
    result.current.deleteTask(task1.id);
    result.current.deleteTask(task2.id);
    expect(result.current.tasks).toEqual([]);

  });
})

describe("edit task", () => {
  it("verify if the task is in list", () => {
    const {result} = renderHook(() => useTask([task1]));
    result.current.editTask("task1");
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
  });
  it("edit task with a new title", () => {
    const {result} = renderHook(() => useTask([task1]));
    result.current.editTask("task1");
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
  });
});

describe("add description", () => {
  it("verify if the task is in list", () => {
    const {result} = renderHook(() => useTask([task1]));
    result.current.addDescription("task1");
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
  });
  it("add description to a task", () => {
    const {result} = renderHook(() => useTask([task1]));
    result.current.addDescription("task1");
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
  });
});

describe("toggle task done or not done", () => {
  it("verify if task is in the list", () => {
    const {result} = renderHook(() => useTask([task1]));
    result.current.toggleTaskDone(task1.id);
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: true}]);
  });
  it("task is complete", () => {
    const {result} = renderHook(() => useTask([task1]));
    result.current.toggleTaskDone(task1.id);
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: true}]);
  });
  it("task isn't complete", () => {
    const {result} = renderHook(() => useTask([task1]));
    result.current.toggleTaskDone(task1.id);
    result.current.toggleTaskDone(task1.id);
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
  });
});
