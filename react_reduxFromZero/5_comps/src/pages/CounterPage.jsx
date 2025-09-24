import Counter from "../components/Counter";

const CounterPage = () => {
  return (
    <div>
      <Counter />
      <Counter initialCount={3} />
      <Counter label="Counter" initialCount={1} />
      <Counter label="Increment" initialCount={2} />
    </div>
  );
};

export default CounterPage;
