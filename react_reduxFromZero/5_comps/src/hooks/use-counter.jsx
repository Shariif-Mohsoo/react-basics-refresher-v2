import { useEffect, useState } from "react";

//Create a custom hook.
export default function useCounter(initialCount) {
  const [count, setCount] = useState(initialCount);
  useEffect(() => {
    console.log(count);
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  const reset = () => {
    setCount(initialCount);
  };

  return {
    count,
    increment,
    reset,
  };
}
