import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  rockets: [],
  searchResults: [],
  filteredResults: [],
  filters: {
    date: "all",
    launchStatus: "all",
    upcoming: false,
  },
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
    setfilterType: (state, { payload }) => {
      state.filters = payload;
    },

    filterResults: (state, { payload }) => {
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
  setfilterType,
  filterResults,
} = rocketSlice.actions;

// export the default reducer
export default rocketSlice.reducer;
