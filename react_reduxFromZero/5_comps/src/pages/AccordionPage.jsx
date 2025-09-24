import React from "react";

import Accordion from "../components/Accordion";

const AccordionPage = () => {
  const items = [
    {
      id: "2xkc",
      label: "Can i use react in my project?",
      content:
        "Absolutely yes! You should feel free to use react in your project. Use library whatever you like.",
    },
    {
      id: "2xkb",
      label: "Can i use vue in my project?",
      content:
        "Absolutely yes! You should feel free to use vue in your project. Use library whatever you like.",
    },
    {
      id: "2xka",
      label: "Can i use next in my project?",
      content:
        "Absolutely yes! You should feel free to use next in your project. Use library whatever you like.",
    },
  ];

  return (
    <div>
      <Accordion items={items} />
    </div>
  );
};

export default AccordionPage;
