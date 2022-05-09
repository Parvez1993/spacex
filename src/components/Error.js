import { Alert, Container } from "react-bootstrap";
import React from "react";

function Error({ msg }) {
  return (
    <Container className="my-5 py-5">
      <Alert variant="danger text-center" className="text-dark">
        <div>{msg}</div>
      </Alert>
    </Container>
  );
}

export default Error;
