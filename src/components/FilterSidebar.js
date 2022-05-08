import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterRocketsbyTime } from "../features/rockets/getRockets/rocketActions";

function FilterSidebar() {
  const dispatch = useDispatch();

  const handleDateChange = (e) => {
    e.preventDefault();
    dispatch(filterRocketsbyTime(e.target.value));
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
    </div>
  );
}

export default FilterSidebar;
