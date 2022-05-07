import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchRockets } from "../features/rockets/getRockets/rocketActions";

function SearchBar() {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(searchRockets(e.target.value));
  };

  return (
    <div className="my-4 py-3">
      <Form className="d-flex justify-content-center">
        <FormControl
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="w-75 outline-dark"
          onChange={handleSearch}
        />
      </Form>
    </div>
  );
}

export default SearchBar;
