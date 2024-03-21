import { useState } from "react";

type CounterProps = {
  initialValue?: number;
  stepValue?: number;
  maxValue?: number;
};

export const useCounter = ({ initialValue = 0, stepValue = 1, maxValue = 10 }: CounterProps = {}) => {

  const [count, setCount] = useState(initialValue)


  const increment = () => {
    //setCount(count + stepValue);
    setCount(Math.min(count + stepValue, maxValue))
    
  };

  const decrement = () => {
    //setCount(count - stepValue);
    setCount(Math.max(count - stepValue, 0));
  };

  const reset = () => {
    setCount(initialValue);
  }

  const changeStep = (newStep: number) => {
    setCount(count + newStep);
  }

  return {
    count,
    increment,
    decrement,
    reset,
    changeStep,
  }
}
