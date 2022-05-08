import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  filterRocketsbyTime,
  getLaunchStatus,
  getUpcoming,
} from "../features/rockets/getRockets/rocketActions";

function FilterSidebar() {
  const dispatch = useDispatch();
  const rocketlist = useSelector((state) => state.getRocket);
  const { date, launchResults, filteredResults, rockets, setLaunchStatus } =
    rocketlist;

  //laucnh status types
  let launchStatusData = [
    { id: 1, label: "All", name: "group1", type: "radio", value: "All" },
    {
      id: 2,
      label: "Success",
      name: "group1",
      type: "radio",
      value: "Success",
    },
    {
      id: 3,
      label: "Failure",
      name: "group1",
      type: "radio",
      value: "Failure",
    },
  ];

  let [upcoming, setUpcoming] = useState(false);
  //launch date
  const handleDateChange = (e) => {
    e.preventDefault();

    if (launchResults.length > 0) {
      dispatch(filterRocketsbyTime(e.target.value, launchResults));
      console.log("first");
    } else {
      dispatch(filterRocketsbyTime(e.target.value, rockets));
      console.log("second");
    }
  };

  //launch status

  const handleLaunchStatus = (e) => {
    if (filteredResults.length > 0) {
      dispatch(getLaunchStatus(e.target.value, filteredResults));
    } else {
      dispatch(getLaunchStatus(e.target.value, rockets));
    }
  };

  //upcoming

  const handleUpcoming = (e) => {
    if (e.target.checked) {
      dispatch(getUpcoming(true));
    } else {
      dispatch(getUpcoming(false));
    }
  };
  return (
    <div className="bg-secondary h-100 mx-2">
      <Form.Label aria-label="Default select example">Select Date</Form.Label>
      <Form.Select
        aria-label="Default select example"
        onChange={handleDateChange}
      >
        <option value="all" defaultChecked>
          All
        </option>
        <option value="last_week">Last Week</option>
        <option value="last_month">Last Month</option>
        <option value="last_year">Last Year</option>
      </Form.Select>

      <Form.Label>Select Launch Status</Form.Label>
      {launchStatusData.map((status) => {
        const { id, label, name, type, value } = status;
        return (
          <Form.Check
            label={label}
            name={name}
            type={type}
            id={id}
            key={id}
            value={value}
            onClick={handleLaunchStatus}
            defaultChecked={setLaunchStatus.includes(value) ? true : false}
          />
        );
      })}

      <Form.Check
        type="checkbox"
        label="Upcoming"
        onClick={(e) => {
          setUpcoming(!upcoming);
          handleUpcoming(e);
        }}
        defaultChecked={upcoming ? true : false}
      />
    </div>
  );
}

export default FilterSidebar;
