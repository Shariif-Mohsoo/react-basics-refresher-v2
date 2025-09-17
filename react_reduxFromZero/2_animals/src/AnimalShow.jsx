import { useState } from "react";
import "./AnimalShow.css";

import bird from "./assets/bird.svg";
import cat from "./assets/cat.svg";
import cow from "./assets/cow.svg";
import dog from "./assets/dog.svg";
import gator from "./assets/gator.svg";
import heart from "./assets/heart.svg";
import horse from "./assets/horse.svg";

const svgMap = {
  bird,
  cat,
  cow,
  dog,
  gator,
  horse,
};

const AnimalShow = ({ type }) => {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  return (
    <div className="animal-show" onClick={handleClick}>
      <img className="animal" src={svgMap[type]} alt="animal" />
      {/* when state change the jsx will be rerendered so that is the reason style is working. */}
      <img
        className="heart"
        src={heart}
        alt="heart"
        style={{
          width: 10 + 10 * clicks + "px",
        }}
      />
    </div>
  );
};

export default AnimalShow;
