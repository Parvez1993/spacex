import axios from "axios";
import { setError, setRockets, setLoading } from "./rocketSlice";

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
  return async (dispatch) => {
    // dispatch(setLoading());
    console.log(letters);
  };
}
