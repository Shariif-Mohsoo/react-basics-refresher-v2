import { useSelector } from "react-redux";

const CarValue = () => {
  const totalCost = useSelector(({ cars: { data, searchTerm } }) => {
    // return state.cars.data;
    //filter logic lives here.........
    const filteredCars = data.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredCars.reduce((acc, car) => {
      return acc + car.cost;
    }, 0);
  });

  return <div className="car-value">Total Cost : ${totalCost}</div>;
};

export default CarValue;
