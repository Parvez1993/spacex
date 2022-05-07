import axios from "axios";
import {
  setError,
  setRockets,
  setLoading,
  searchRocketsList,
} from "./rocketSlice";

// fetch all items
export function fetchRockets() {
  return async (dispatch) => {
    dispatch(setLoading());
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        dispatch(setRockets(response.data));
      })
      .catch((err) => {
        dispatch(setError(err.message));
      });
  };
}

export function searchRockets(letters) {
  return async (dispatch, getState) => {
    let { rockets } = getState().getRocket;
    let searchArray = [];
    rockets.map((item) => {
      if (item.rocket.rocket_name.toLowerCase().includes(letters)) {
        searchArray.push(item);
      }
    });

    console.log(searchArray);
    console.log(letters);

    dispatch(searchRocketsList(searchArray));
    // dispatch(setLoading());
  };
}
