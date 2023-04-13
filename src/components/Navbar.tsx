import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Image, Alert } from 'react-bootstrap';
import { UserTypes } from '@/types/auth';
import logo from '@/public/logo.svg';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom, tokenDataAtom } from '@/stores/auth';

const Brand = () => {
    return (
        <Navbar.Brand href="/">
            <Image
                src={logo}
                height="40px"
                className="d-inline-block align-top"
                alt="Logo"
            />
        </Navbar.Brand>
    );
};

const Logout = () => {
    const navigate = useNavigate();

    return (
        <>
            <Nav.Link
                onClick={(e) => {
                    localStorage.removeItem('token');
                    navigate('/');
                    window.location.reload();
                }}
            >
                Выйти
            </Nav.Link>
        </>
    );
};

const NavigationContent = () => {
    const [isAuthenticated] = useAtom(isAuthenticatedAtom);
    const [tokenData] = useAtom(tokenDataAtom);
    const role = tokenData?.Role;

    if (!isAuthenticated) {
        return (
            <>
                <Nav.Link href="/login">Вход</Nav.Link>
                <Nav.Link href="/signup">Регистрация</Nav.Link>
            </>
        );
    }

    if (role === UserTypes.CUSTOMER) {
        return (
            <>
                <Nav.Link href="/customer/profile">Профиль</Nav.Link>
                <Nav.Link href="/customer/searches">Мои поиски</Nav.Link>
                <Nav.Link href="/customer/search/new">Создать поиск</Nav.Link>
                <Logout />
            </>
        );
    }
    if (role === UserTypes.EXECUTOR) {
        return (
            <>
                <Nav.Link href="/executor/profile">Профиль</Nav.Link>
                <Nav.Link href="/executor/searches">Поиски</Nav.Link>
                <Logout />
            </>
        );
    }

    return (
        <>
            <Alert variant="danger">unknown auth state</Alert>
        </>
    );
};

export const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg" className="mb-5 pt-2 pb-2">
            <Container>
                <Brand />
                <Nav className="ml-auto">
                    <NavigationContent />
                </Nav>
            </Container>
        </Navbar>
    );
};
