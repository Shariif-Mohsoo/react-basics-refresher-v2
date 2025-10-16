import { configureStore } from "@reduxjs/toolkit";

import { formReducer, changeName, changeCost } from "./slices/formSlice";

import {
  carsReducer,
  addCar,
  removeCar,
  changeSearchTerm,
} from "./slices/carsSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    cars: carsReducer,
  },
});

export { changeName, changeCost, addCar, removeCar, changeSearchTerm };
