import { useState } from "react";

import { GoChevronDown, GoChevronLeft } from "react-icons/go";

const Accordion = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nxtIdx) => {
    //functional version of updating state
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === nxtIdx) return -1;
      else return nxtIdx;
    });
    //simple way to update state
    // if (expandedIndex === nxtIdx) setExpandedIndex(-1);
    // else setExpandedIndex(nxtIdx);
  };

  const renderedItems = items.map((item, idx) => {
    const isExpanded = idx === expandedIndex;
    const icon = (
      <span className="text-2xl border border-amber-200">
        {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
      </span>
    );

    return (
      <div key={item.id}>
        <div
          className="p-3 bg-gray-50 border-b flex items-center cursor-pointer justify-between"
          onClick={() => handleClick(idx)}
        >
          {item.label} {icon}
        </div>
        {isExpanded && <div className="border-b p-5">{item.content}</div>}
      </div>
    );
  });

  return <div className="border-b border-t rounded">{renderedItems}</div>;
};

export default Accordion;
