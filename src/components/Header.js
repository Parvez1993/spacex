import React from "react";
import { Container, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand href="/" className="text-white">
          SpaceX
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
