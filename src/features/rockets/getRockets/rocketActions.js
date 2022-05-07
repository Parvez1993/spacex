import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getRocketBegin,
  getRocketError,
  getRocketSuccess,
} from "./rocketSlice";

export const getRockets = createAsyncThunk(
  "rockets/getRockets",
  async (dispatch, getState) => {
    try {
      dispatch(getRocketBegin());
      const { data } = await axios.get(
        "https://api.spacexdata.com/v3/launches"
      );

      dispatch(getRocketSuccess(data));
    } catch (error) {
      dispatch(getRocketError(error));
    }
  }
);
