import { useEffect, useRef, useState } from "react";

import { GoChevronDown } from "react-icons/go";

import Panel from "./Panel";

const Dropdown = ({ options, selection, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const divEl = useRef();

  useEffect(() => {
    const handler = (e) => {
      // console.log(divEl.current);
      if (!divEl?.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleClick = () => {
    //functional way
    setIsOpen((currentIsOpen) => !currentIsOpen);
    //normal/simple way (not 100% correct)
    // handleIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    //close dropdown
    setIsOpen(false);
    //which option user select?
    // console.log(option);
    onSelect(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });
  //   const content = selection || "Select...";
  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        className="flex justify-between items-center font-bold cursor-pointer "
        onClick={handleClick}
      >
        {selection?.label || " Select.."}.
        <GoChevronDown className="text-2xl" />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  );
};

export default Dropdown;
