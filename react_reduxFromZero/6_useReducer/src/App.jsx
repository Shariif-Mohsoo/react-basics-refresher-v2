import Counter from "./Counter";
const App = () => {
  return (
    <div>
      <div>
        <Counter initialCount={0} />
      </div>
      <div>
        <Counter initialCount={1} />
      </div>
    </div>
  );
};

export default App;
