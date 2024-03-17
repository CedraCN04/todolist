"use client";

import { useCounter } from "@/lib/hooks/counter";
import { Button } from "../ui/button";

export default function Counter() {
  const { count, increment, decrement } = useCounter({
    initialValue: 2,
    stepValue: 3,
  });

  return (
    <div>
      <Button onClick={decrement}>-</Button>
      {count}
      <Button onClick={increment}>+</Button>
    </div>
  );
}

