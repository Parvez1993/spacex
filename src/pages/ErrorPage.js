import React from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <Container className="my-5 py-5">
      <Alert variant="danger text-center" className="text-dark">
        <div>
          <h3>No such Page Exists</h3>
        </div>
        <Link to="/">
          <Button size="sm" className="bg-dark">
            Go back
          </Button>
        </Link>
      </Alert>
    </Container>
  );
}

export default ErrorPage;
