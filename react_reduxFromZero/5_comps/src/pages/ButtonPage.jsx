import { GoBell, GoCloud, GoDatabase } from "react-icons/go";

import Button from "../components/Button";

const ButtonPage = () => {
  const handleClick = () => {
    console.log("Click!!!!");
  };
  const handleMouseOver = () => {
    console.log("Mouse over!!!!");
  };

  return (
    <div className="flex flex-wrap" id="btnsParent">
      <div>
        <Button primary className="mb-4">
          <GoBell />
          Click Me!
        </Button>
      </div>
      <div>
        <Button secondary className="mb-3">
          <GoCloud />
          Buy Now!
        </Button>
      </div>
      <div>
        <Button warning={true}>
          <GoDatabase />
          See you!
        </Button>
      </div>
      <div>
        <Button danger={true}>Look her!</Button>
      </div>
      <div>
        <Button success={true}>Preety ha!</Button>
      </div>
      <div>
        <Button rounded={true}>Rounded ha!</Button>
      </div>
      <div>
        <Button danger={true} outline={true}>
          Rounded ha!
        </Button>
      </div>
      <div>
        <Button primary outline>
          Rounded ha!
        </Button>
      </div>
    </div>
  );
};

export default ButtonPage;
