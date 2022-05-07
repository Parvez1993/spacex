import axios from "axios";
import { setError, setRockets } from "./rocketSlice";

// fetch all items
export function fetchRockets() {
  return async (dispatch) => {
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
