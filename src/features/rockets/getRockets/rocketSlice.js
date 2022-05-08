import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  rockets: [],
  searchResults: [],
  date: "all",
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
      state.searchResults = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },

    searchRocketsList: (state, { payload }) => {
      state.searchResults = payload;
    },
    setDateType: (state, { payload }) => {
      state.date = payload;
    },
    filterRocketbyDate: (state, { payload }) => {
      state.searchResults = payload;
    },
  },
});

// export the actions
export const {
  setLoading,
  setRockets,
  setError,
  searchRocketsList,
  setDateType,
  filterRocketbyDate,
} = rocketSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")

// export the default reducer
export default rocketSlice.reducer;
