import "./App.css";

import { useState } from "react";
import AnimalShow from "./AnimalShow";

function getRandomAnimal() {
  const animals = ["bird", "cat", "cow", "dog", "gator", "horse"];
  const idx = Math.floor(Math.random() * animals.length);
  return animals[idx];
}
// console.log(getRandomAnimal());

const App = () => {
  // State for counter(count) variable
  const [count, setCount] = useState(0);
  // state for animals array
  const [animals, setAnimals] = useState([]);

  const handleClick = () => {
    //console.log("Button Clicked!");
    // updating the count variable
    setCount(count + 1);
    // not recommended
    // animals.push(getRandomAnimal()); //this will modifies the piece of state
    // creating a brand new animals array
    setAnimals([...animals, getRandomAnimal()]);
  };

  const handleResetClick = () => {
    // Resetting the state both elements (count and Animals)
    setCount(0);
    setAnimals([]);
  };

  const renderedAnimals = animals.map((animal, idx) => {
    return <AnimalShow type={animal} key={idx} />;
  });
  return (
    <div>
      <div className="app">
        <button className="resetBtn" onClick={handleResetClick}>
          Reset
        </button>
        <p>
          Added Animals : <span>{count}</span>
        </p>
        <button onClick={handleClick}>Add Animal</button>
        <div className="animal-list">{renderedAnimals}</div>
      </div>
    </div>
  );
};

export default App;
