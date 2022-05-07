import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  rockets: [],
};
const rocketSlice = createSlice({
  name: "rockets",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setRockets: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.rockets = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },

    searchRockets: (state, { payload }) => {
      state.rockets = payload;
    },
  },
});

// export the actions
export const { setLoading, setRockets, setError } = rocketSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")

// export the default reducer
export default rocketSlice.reducer;
