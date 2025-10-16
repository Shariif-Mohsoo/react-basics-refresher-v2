import { useDispatch, useSelector } from "react-redux";

import { changeSearchTerm } from "../store";

const CarSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.cars.searchTerm);

  const handleSearchTermChange = (event) => {
    dispatch(changeSearchTerm(event.target.value));
  };

  return (
    <div className="list-header" style={{ marginBottom: "20px" }}>
      <h3 className="title is-3">My Cars</h3>
      <div className="search field is-horizontal">
        <label htmlFor="" className="label">
          Search
        </label>
        <input
          type="text"
          className="input"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
    </div>
  );
};

export default CarSearch;
