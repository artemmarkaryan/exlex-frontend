import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>My React App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="ml-auto">
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    </Navbar>
  );
}
