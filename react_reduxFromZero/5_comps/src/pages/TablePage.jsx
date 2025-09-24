import Table from "../components/Table";

import SortableTable from "./SortableTable";

const TablePage = () => {
  const data = [
    { name: "Orange", color: "bg-orange-500", score: 2 },
    { name: "Apple", color: "bg-red-500", score: 4 },
    { name: "Banana", color: "bg-yellow-500", score: 1 },
    { name: "Lime", color: "bg-green-500", score: 3 },
    { name: "Mango", color: "bg-yellow-300", score: 5 },
  ];
  const config = [
    {
      label: "Name",
      render: (fruit) => fruit.name,
      sortValue: (fruit) => fruit.name,
    },
    {
      label: "Color",
      render: (fruit) => <div className={`p-3 m-2  ${fruit.color}`}></div>,
    },
    {
      label: "Score",
      render: (fruit) => fruit.score,
      sortValue: (fruit) => fruit.score,
      //Inside the sortableTable.jsx
      // header: () => <th className="bg-red-500">Score</th>,
    },
  ];

  const keyFn = (fruit) => fruit.name;

  return (
    <div>
      <SortableTable data={data} config={config} keyFn={keyFn} />
    </div>
  );
};

export default TablePage;
