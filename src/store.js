import { configureStore } from "@reduxjs/toolkit";
import rocketReducer from "./features/rockets/getRockets/rocketSlice";
const store = configureStore({
  reducer: {
    getRocket: rocketReducer,
  },
});

export default store;
