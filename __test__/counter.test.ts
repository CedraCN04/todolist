// initial value 0 by default OK
// increment OK
// decrement OK
// not decrement below 0 OK
// init with initial value ok
// init with step value ok
// init with initial value and step value ok
// reset initial value ok
// change step ok

import { act, renderHook } from "@testing-library/react-hooks";
import { useCounter } from "../lib/hooks/counter";

// new feature

describe("useCounter", () => {
  it("initial value 0 by default", () => {
    const { result:counter } = renderHook(() => useCounter());
    expect(counter.current.count).toBe(0);
  });
  
  it("increment (step 1 by default)", () => {
    const { result:counter } = renderHook(() => useCounter());
    act(() => {
      counter.current.increment();
    })
    expect(counter.current.count).toBe(1);
  });

  it("decrement (step 1 by default)", () => {
    const { result:counter } = renderHook(useCounter);
    act(() => {
      counter.current.increment();
    })
    act(() => {
      counter.current.increment();
    })
    act(()=> {
      counter.current.decrement();
    })
    expect(counter.current.count).toBe(1);
  });

  it ("not decrement below 0", () => {
    const {result:counter} = renderHook(useCounter);
    act(() => {
      counter.current.decrement();
    })
    expect(counter.current.count).toBe(0);
  });

  it("init with initial value", () => {
    const {result:counter} = renderHook(() => useCounter({initialValue: 10}));
    expect(counter.current.count).toBe(10);
  });

  it("init with step value", () => {
    const {result:counter} = renderHook(() => useCounter({stepValue: 10}));
    act(() => {
      counter.current.increment();
    })
    expect(counter.current.count).toBe(10);
  });

  it("init with initial and step value", () => {
    const {result:counter} = renderHook(() => useCounter({initialValue: 1, stepValue: 5}));
    act(() => {
      counter.current.increment();
    })
    expect(counter.current.count).toBe(6);
    act(() => {
      counter.current.decrement();
    })
    expect(counter.current.count).toBe(1);
  })

  it("reset initial value", () => {
    const {result:counter} = renderHook(() => useCounter({initialValue: 1}));
    act(() => {
      counter.current.increment();
    })
    act(() => {
      counter.current.reset();
    })
    act(() => {
      counter.current.decrement();
    })
    act(() => {
      counter.current.reset();
    })
    expect(counter.current.count).toBe(1);
  });

  it("change step", () => {
    const { result:counter} = renderHook(() => useCounter({initialValue: 1, stepValue: 5}));
    act(() => {
      counter.current.increment();
    })
    expect(counter.current.count).toBe(6);
    act(() => {
      counter.current.changeStep(2);
    })
    expect(counter.current.count).toBe(8);
  })

  it("init max value", () => {
    const { result: counter } = renderHook(() => useCounter({initialValue: 7, stepValue: 3, maxValue: 10}));
    act(() => {
      counter.current.increment();
    })
    expect(counter.current.count).toBe(10);
    act(() => {
      counter.current.increment();
    })
    expect.soft(counter.current.count).toBe(10);
    expect(counter.current.count).not.toBe(13);
  })
});