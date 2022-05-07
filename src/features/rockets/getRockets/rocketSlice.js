import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  rockets: [],
};
const rocketSlice = createSlice({
  name: "rockets",
  initialState,
  reducers: {
    getRocketBegin: (state) => {
      state.loading = true;
    },
    getRocketSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.rockets = payload;
    },
    getRocketError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getRocketBegin, getRocketSuccess, getRocketError } =
  rocketSlice.actions;

export default rocketSlice.reducer;
