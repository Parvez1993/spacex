import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilters,
  updateFiltersTypes,
} from "../features/rockets/getRockets/rocketActions";

function FilterSidebar() {
  const dispatch = useDispatch();
  const rocketlist = useSelector((state) => state.getRocket);
  const { filters, searchResults } = rocketlist;

  const { upcoming } = filters;

  const [render, setRender] = useState(false);

  useEffect(() => {
    if (setRender) {
      dispatch(updateFilters());
      setRender(false);
    }
  }, [render]);

  //laucnh status types
  let launchStatusData = [
    { id: 1, label: "All", name: "launchStatus", type: "radio", value: "all" },
    {
      id: 2,
      label: "Success",
      name: "launchStatus",
      type: "radio",
      value: "Success",
    },
    {
      id: 3,
      label: "Failure",
      name: "launchStatus",
      type: "radio",
      value: "Failure",
    },
  ];

  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "upcoming") {
      value = e.target.checked;
    }

    dispatch(updateFiltersTypes(name, value));

    setRender(true);
  };
  return (
    <div className=" h-100 m-4 p-3 my-5 border border-secondary ">
      <Form.Label aria-label="Default select example">
        <h5>Select Date</h5>
      </Form.Label>
      <Form.Select
        aria-label="Default select example"
        onChange={updateFilter}
        name="date"
      >
        <option value="all" name="date" defaultChecked>
          All
        </option>
        <option value="last_week">Last Week</option>
        <option value="last_month">Last Month</option>
        <option value="last_year">Last Year</option>
      </Form.Select>

      <div className="my-5">
        {" "}
        <Form.Label>
          <h5>Select Launch Status</h5>
        </Form.Label>
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
              onClick={updateFilter}
            />
          );
        })}
      </div>

      <Form.Check
        type="checkbox"
        label="Upcoming"
        onClick={updateFilter}
        name="upcoming"
        checked={upcoming}
      />
    </div>
  );
}

export default FilterSidebar;
