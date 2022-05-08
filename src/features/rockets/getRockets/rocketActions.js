import axios from "axios";
import moment from "moment";
import {
  setError,
  setRockets,
  setLoading,
  searchRocketsList,
  setDateType,
  filterRocketbyDate,
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

export function filterRocketsbyTime(dateValue) {
  return async (dispatch, getState) => {
    let { rockets } = getState().getRocket;
    // get the latest launch date since we have date till 2020
    dispatch(setDateType(dateValue));
    let tempDate;

    // dispatch(setLoading());
    tempDate = await axios
      .get("https://api.spacexdata.com/v3/launches/next")
      .then((response) => response.data)
      .catch((err) => {
        dispatch(setError(err.message));
      });

    console.log(rockets);

    let latestDate = moment(tempDate.launch_date_local).format("MMM Do YY");
    let lastweekDate = moment(tempDate.launch_date_local).subtract(7, "days");
    let lastMonth = moment(tempDate.launch_date_local).subtract(1, "month");
    let lastYear = moment(tempDate.launch_date_local).subtract(1, "year");
    let tempData;
    if (dateValue === "last_week") {
      tempData = rockets.filter(
        (rocket) => moment(rocket.launch_date_local) >= lastweekDate
      );
    } else if (dateValue === "last_month") {
      tempData = rockets.filter(
        (rocket) => moment(rocket.launch_date_local) >= lastMonth
      );
    } else if (dateValue === "last_year") {
      tempData = rockets.filter(
        (rocket) => moment(rocket.launch_date_local) >= lastYear
      );
    } else if (dateValue === "all") {
      tempData = rockets;
    } else {
      return 0;
    }
    dispatch(filterRocketbyDate(tempData));
  };
}
