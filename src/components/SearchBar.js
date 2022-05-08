import React, { useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchRockets } from "../features/rockets/getRockets/rocketActions";

function SearchBar() {
  const [reload, setReload] = useState(false);

  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchRockets(e.target.value.toLowerCase()));
    setReload(true);
  };

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload, dispatch, setReload]);

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
