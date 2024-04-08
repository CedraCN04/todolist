import { act, renderHook } from "@testing-library/react-hooks";
import { useTask } from "../lib/hooks/useTask";
import { Task } from "../types/types";

const task1: Task = {
  id: 1,
    title: "task1",
    done: false,
}

const task2: Task = {
    id : 2,
    title: "task2",
    done: false,
}

describe("init tasks", () => {
  it("init tasks with no values", () => {
    const { result } = renderHook(() => useTask());
    expect(result.current.tasks).toEqual([]);
  });
});

describe("add task", () => {
  it("add task do nothing if title is empty or null", () => {
    const { result } = renderHook(() => useTask());
    act(() => {
      result.current.addTask("");
    })
    expect(result.current.tasks).toEqual([]);
  });
  it("add first todo", () => {
    const { result } = renderHook(() => useTask());
    act(() => {
      result.current.addTask("task1");
    })
    expect(result.current.tasks).toEqual([task1]);
  });
  it("add second todo", () => {
    const { result } = renderHook(() => useTask([task1]));
    act(() => {
      result.current.addTask("task2");
    })
    expect(result.current.tasks).toEqual([task1, task2]);
  });
  it("add task in local storage when a task is added", () => {
    const mockLocalStorage = {
      setItem: vi.fn(),
      getItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
      length: 0,
    };
    global.localStorage = mockLocalStorage;
  
    const { result } = renderHook(() => useTask());
    act(() => {
      result.current.addTask("task1");
    })
  
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });
})

describe("delete task", () => {
  it("delete one task if there is only one task", () => {
    const {result} = renderHook(() => useTask([task1]));
    act(() => {
      result.current.deleteTask(task1.id);
    })
    expect(result.current.tasks).toEqual([]);
  });
  it("if two tasks on the array, when I delete two tasks, render empty array", () => {
    const {result}= renderHook(() => useTask([task1, task2]));
    result.current.deleteTask(task1.id);
    result.current.deleteTask(task2.id);
    expect(result.current.tasks).toEqual([]);
  });
  it("delete the right task in the task list if there are more than one task", () => {
    const {result} = renderHook(() => useTask([task1, task2]));
    act(() => {
      result.current.deleteTask(task2.id);
    })
    expect(result.current.tasks).toEqual([task1]);
  });
});

describe("edit task", () => {
  it("edit task in the array if there is one task, after seleted it", () => {
    const { result } = renderHook(() => useTask([task1]));
    const newTodo = {
      ...task1,
      title: "task edited"
    }
    
    act(() => {
      result.current.updateTask(newTodo);
    })
    expect(result.current.tasks).toEqual([newTodo]);
  });
});

describe("add description", () => {
  it("add a description when a task is selected", () => {
    const { result } = renderHook(() => useTask([task1]));
    const newTodo = {
      ...task1,
      description: "Bonjour"
    }
    act(() => {
      result.current.updateTask(newTodo);
    });
    expect(result.current.tasks).toEqual([newTodo]);
  })
})

describe("toggle task done or not done", () => {
  it("toggle task is done or not if task is selected", () => {
    const { result } = renderHook(() => useTask([task1]));
    const newTodo = {
      ...task1,
      done: true
    }
    act(() => {
      result.current.updateTask(newTodo);
    });
    expect(result.current.tasks).toEqual([newTodo]);
  })
});



