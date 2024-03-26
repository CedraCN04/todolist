import { act, renderHook } from "@testing-library/react-hooks";
import { v4 as uuidv4 } from "uuid";
import { useTask } from "../lib/hooks/useTask";
import { Task } from "../types/types";

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
    act(() => {
      result.current.addTask("");
    })
    expect(result.current.tasks).toEqual([]);
  });
  it("task added to a list", () => {
    const { result } = renderHook(() => useTask());
    act(() => {
      result.current.addTask("task1");
    })
    expect(result.current.tasks).toEqual([{id: expect.any(String), title: "task1", done: false}]);
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

// edit task if task is selected
// what happened if no task selected

// 1. je sélectionne une tâche
// 11. test de la selection
// 2. Je modifie ma tâche
// 3. que dois-je contrôler avec mon expect ?
describe("edit task", () => {
  it("edit task in the array if there is one task, after seleted it", () => {
    const { result } = renderHook(() => useTask([task1]));
    // test de selection d'une tâche
    act(() => {
      result.current.selectTask(task1.id);
    });
    expect(result.current.currentTaskId).toBe(task1.id);
    act(() => {
      result.current.editTask("task edited");
    })
    expect(result.current.tasks).toEqual([{ id: expect.any(String), title: "task edited", done: false }]);
    // test que la task n'est plus selectionnée
    expect(result.current.currentTaskId).toBe(null);
  });
  // test si pas de selection ? il se passe quoi ?
  it("no task selected, return nothing", () => {
    const { result } = renderHook(() => useTask([task1]));
    act(() => {
      result.current.editTask("task edited");
    })
    expect(result.current.tasks).toEqual([task1]);
  })
});

// 1. je sélectionne une tâche
// 2. J'ajoute une description
// 3. Que se passe-t-il si aucune tâche n'est selectionnée ?
describe("add description", () => {
  it("add a description when a task is selected", () => {
    const { result } = renderHook(() => useTask([task1]));
    act(() => {
      result.current.selectTask(task1.id);
    });
    expect(result.current.currentTaskId).toBe(task1.id);
    act(() => {
      result.current.addDescription("Bonjour");
    });
    expect(result.current.tasks).toEqual([{ id: expect.any(String), title: "task1", done: false, description: "Bonjour" }]);
  })
  it("no task selected, return nothing", () => {
    const { result } = renderHook(() => useTask([task1]));
    act(() => {
      result.current.addDescription("Bonjour");
    });
    expect(result.current.tasks).toEqual([task1]);
  })
})

// 1. je selectionne ma tâche
// 2. je change le statut de ma tâche
// 4. que se passe-t-il si je ne selctionne aucune tâche ? 
describe("toggle task done or not done", () => {
  it("toggle task is done or not if task is selected", () => {
    const { result } = renderHook(() => useTask([task1]));
    act(() => {
      result.current.selectTask(task1.id);
    });
    expect(result.current.currentTaskId).toBe(task1.id);
    act(() => {
      result.current.toggleTaskDone(task1.id);
    });
    expect(result.current.tasks).toEqual([{ id: expect.any(String), title: "task1", done: true }]);
  })
  it("no task selected, return nothing", () => {
    const { result } = renderHook(() => useTask([task1]));
    act(() => {
      result.current.toggleTaskDone(task1.id);
    });
    expect(result.current.tasks).toEqual([task1]);
  })
});
