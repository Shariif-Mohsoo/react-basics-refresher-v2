import { Fragment } from "react";

const Table = ({ data, config, keyFn }) => {
  const renderedHeader = config.map((column) => {
    if (column.header)
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRow = data.map((rowData) => {
    return (
      <tr className="border-b" key={keyFn(rowData)}>
        {/* <td className="p-3">{config[0].render(rowData)}</td>
        <td className="p-3">{config[1].render(rowData)}</td>
        <td className="p-3">{config[2].render(rowData)}</td> */}

        {config.map((column) => (
          <td key={column.label} className="p-3">
            {column.render(rowData)}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2 font-extrabold">{renderedHeader}</tr>
      </thead>
      <tbody>{renderedRow}</tbody>
    </table>
  );
};

export default Table;
