import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { AuthStates } from '@/dict/Dict'
import logo from '/logo.svg'


const Brand = () => {
    return (
        <Navbar.Brand href="/">
            <Image src={logo} height="40px" className="d-inline-block align-top" alt="Logo" />
        </Navbar.Brand>
    )
}

export const Navigation = (props: any) => {
    if (props.authState === AuthStates.UNAUTHENTICATED) {
        return (
            <Navbar
                bg="light"
                expand="lg"
                className="mb-5 pt-2 pb-2"
            >
                <Container>
                    <Brand/ >
                    <Nav className="ml-auto">
                        <Nav.Link href="/login">Вход</Nav.Link>
                        <Nav.Link href="/signup">Регистрация</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}
