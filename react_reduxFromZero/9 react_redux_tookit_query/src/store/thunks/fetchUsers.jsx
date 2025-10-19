import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  await pause(1000);
  //   console.log(response.data);
  return response.data;
});

// DEV Only
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

//it will be pending -> fullFilled / rejected.
export { fetchUsers };
