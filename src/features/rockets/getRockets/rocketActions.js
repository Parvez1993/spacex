import axios from "axios";
import moment from "moment";
import {
  setError,
  setRockets,
  setLoading,
  searchRocketsList,
  setDateType,
  filterRocketbyDate,
  setLaunchStatus,
  filterLaunchStatus,
  setUpcoming,
  filterUpcoming,
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

    dispatch(searchRocketsList(searchArray));
    // dispatch(setLoading());
  };
}

export function filterRocketsbyTime(dateValue, tempData) {
  return async (dispatch, getState) => {
    let { setLaunchStatus, rockets, launchResults } = getState().getRocket;
    // get the latest launch date since we have date till 2020
    dispatch(setDateType(dateValue));

    console.log("hello", tempData);
    let tempDate;

    // dispatch(setLoading());
    tempDate = await axios
      .get("https://api.spacexdata.com/v3/launches/next")
      .then((response) => response.data)
      .catch((err) => {
        dispatch(setError(err.message));
      });

    console.log(moment(tempDate.launch_date_local).format("MMMM Do YYYY"));
    let lastweekDate = moment(tempDate.launch_date_local).subtract(7, "days");
    let lastMonth = moment(tempDate.launch_date_local).subtract(1, "month");
    let lastYear = moment(tempDate.launch_date_local).subtract(1, "year");
    let tempDataResults = tempData;

    if (dateValue === "last_week") {
      tempDataResults = tempData.filter(
        (rocket) => moment(rocket.launch_date_local) >= lastweekDate
      );
    } else if (dateValue === "last_month") {
      tempDataResults = tempData.filter(
        (rocket) => moment(rocket.launch_date_local) >= lastMonth
      );
    } else if (dateValue === "last_year") {
      tempDataResults = tempData.filter(
        (rocket) => moment(rocket.launch_date_local) >= lastYear
      );
    } else if (dateValue === "all") {
      if (setLaunchStatus === "All") {
        console.log("i am here i think");
        tempDataResults = rockets;
      } else {
        tempDataResults = tempData;
      }
    } else {
      return 0;
    }
    dispatch(filterRocketbyDate(tempDataResults));
  };
}

export function getLaunchStatus(status, tempData) {
  return async (dispatch, getState) => {
    let { rockets, searchResults, date } = getState().getRocket;
    // get the latest launch date since we have date till 2020

    let tempDataResults = tempData;
    dispatch(setLaunchStatus(status));

    console.log(tempData);

    console.log(status);
    if (status === "All") {
      if (date === "all") {
        tempDataResults = rockets;
      } else {
        tempDataResults = tempData;
      }
    } else if (status === "Success") {
      console.log("i am here");
      tempDataResults = tempData.filter(
        (rocket) => rocket.launch_success === true
      );
      console.log(tempDataResults);
    } else if (status === "Failure") {
      tempDataResults = tempData.filter(
        (rocket) => rocket.launch_success === false
      );
    } else {
      return 0;
    }

    dispatch(filterLaunchStatus(tempDataResults));
  };
}

export function getUpcoming(upcoming) {
  return async (dispatch, getState) => {
    let { searchResults, date, setLaunchStatus, rockets } =
      getState().getRocket;
    let tempData;
    dispatch(setUpcoming(upcoming));
    if (upcoming === true) {
      tempData = searchResults.filter((rocket) => rocket.upcoming === upcoming);
    } else if (upcoming === false) {
      if (date === "all" && setLaunchStatus === "All") {
        tempData = rockets;
      } else {
        tempData = searchResults;
      }
    }
    dispatch(filterUpcoming(tempData));
  };
}
