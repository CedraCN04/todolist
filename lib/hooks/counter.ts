import { useState } from "react";

type CounterProps = {
  initialValue?: number;
  stepValue?: number;
};

export const useCounter = ({ initialValue = 0, stepValue = 1 }: CounterProps = {}) => {

  const [count, setCount] = useState(initialValue)


  const increment = () => {
    setCount(count + stepValue);
  };

    const decrement = () => {
    setCount(Math.max(count - stepValue, 0));
      
  };

  return {
    count,
    increment,
    decrement
  }
}
