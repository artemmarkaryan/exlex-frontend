import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export const Navigation = () => {
	return (
		<Navbar bg="light" expand="lg">
			<div className="container">
				<Navbar.Brand href="/">ExLex</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Nav className="ml-auto">
					<Nav.Link href="/login">Login</Nav.Link>
				</Nav>
			</div>
		</Navbar>
	);
};
