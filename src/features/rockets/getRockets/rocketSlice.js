import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  rockets: [],
  searchResults: [],
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

    searchRocketsList: (state, { payload }) => {
      state.searchResults = payload;
    },
  },
});

// export the actions
export const { setLoading, setRockets, setError, searchRocketsList } =
  rocketSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")

// export the default reducer
export default rocketSlice.reducer;
