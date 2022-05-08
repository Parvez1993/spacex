import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  rockets: [],
  searchResults: [],
  date: "all",
  filteredResults: [],
  setLaunchStatus: "All",
  launchResults: [],
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
      state.filteredResults = payload;
      state.searchResults = payload;
    },

    setLaunchStatus: (state, { payload }) => {
      state.setLaunchStatus = payload;
    },
    filterLaunchStatus: (state, { payload }) => {
      state.launchResults = payload;
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
  setLaunchStatus,
  filterLaunchStatus,
} = rocketSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")

// export the default reducer
export default rocketSlice.reducer;
