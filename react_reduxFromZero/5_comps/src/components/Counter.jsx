import Button from "../components/Button";

import useCounter from "../hooks/use-counter";

const Counter = ({ label, initialCount }) => {
  //   const [count, setCount] = useState(initialCount);
  //   useEffect(() => {
  //     console.log(count);
  //   }, [count]);

  //   const increment  = () => {
  //     setCount(count + 1);
  //   };

  //An example to create and use the custom hook.
  const { count, increment, reset } = useCounter(initialCount || 0);

  return (
    <div>
      <div className="w-3xs flex justify-between flex-wrap p-2 ">
        <Button onClick={increment} secondary className="cursor-pointer mb-2">
          {label || "Count"}
        </Button>
        <Button onClick={reset} danger className="cursor-pointer">
          Reset
        </Button>
      </div>
      <h1 className="ml-1.5 font-bold">Count: {count}</h1>
    </div>
  );
};

export default Counter;
