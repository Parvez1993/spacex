import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <Spinner animation="border" role="status">
        <span className="">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
