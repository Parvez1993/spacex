import axios from "axios";
import moment from "moment";
import {
  setError,
  setRockets,
  setLoading,
  searchRocketsList,
  setfilterType,
  filterResults,
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

// fetch search by text results

export function searchRockets(letters) {
  return async (dispatch, getState) => {
    let { rockets } = getState().getRocket;
    let searchArray = [];
    rockets.map((item) =>
      item.rocket.rocket_name.toLowerCase().includes(letters)
        ? searchArray.push(item)
        : ""
    );

    dispatch(searchRocketsList(searchArray));
  };
}

// select filter types

export function updateFiltersTypes(name, value) {
  return async (dispatch, getState) => {
    let { filters } = getState().getRocket;
    dispatch(setfilterType({ ...filters, [name]: value }));
  };
}

// Filter and display data

export function updateFilters() {
  return async (dispatch, getState) => {
    let { filters, rockets } = getState().getRocket;
    let tempProducts = rockets;
    const { date, launchStatus, upcoming } = filters;
    let tempDate;
    if (date !== "all") {
      tempDate = await axios
        .get("https://api.spacexdata.com/v3/launches/next")
        .then((response) => response.data)
        .catch((err) => {
          dispatch(setError(err.message));
        });
      let lastweekDate = moment(tempDate.launch_date_local).subtract(7, "days");
      let lastMonth = moment(tempDate.launch_date_local).subtract(1, "month");
      let lastYear = moment(tempDate.launch_date_local).subtract(1, "year");

      if (date === "last_week") {
        tempProducts = tempProducts.filter(
          (rocket) => moment(rocket.launch_date_local) >= lastweekDate
        );
      } else if (date === "last_month") {
        tempProducts = tempProducts.filter(
          (rocket) => moment(rocket.launch_date_local) >= lastMonth
        );
      } else if (date === "last_year") {
        tempProducts = tempProducts.filter(
          (rocket) => moment(rocket.launch_date_local) >= lastYear
        );
      }
    }
    if (launchStatus !== "all") {
      if (launchStatus === "Success") {
        tempProducts = tempProducts.filter(
          (rocket) => rocket.launch_success === true
        );
      } else if (launchStatus === "Failure") {
        tempProducts = tempProducts.filter(
          (rocket) => rocket.launch_success === false
        );
      } else {
        return 0;
      }
    }
    if (upcoming !== false) {
      tempProducts = tempProducts.filter((product) => product.upcoming);
    }

    dispatch(filterResults(tempProducts));
  };
}
