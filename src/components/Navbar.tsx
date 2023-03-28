import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { UserTypes } from '@/dict/Dict'
import logo from '/logo.svg'
import { useAtom } from 'jotai';
import { isAuthenticatedAtom, tokenDataAtom } from '@/stores/auth';
import { Alert } from './Alert';


const Brand = () => {
    return (
        <Navbar.Brand href="/">
            <Image src={logo} height="40px" className="d-inline-block align-top" alt="Logo" />
        </Navbar.Brand>
    )
}

const NavigationContent = () => {
    const [isAuthenticated] = useAtom(isAuthenticatedAtom);
    const [tokenData] = useAtom(tokenDataAtom);

    if (!isAuthenticated) {
        return (<>
            <Nav.Link href="/login">Вход</Nav.Link>
            <Nav.Link href="/signup">Регистрация</Nav.Link>
        </>)
    } else if (tokenData?.Role === UserTypes.CUSTOMER){
        return <>
            <Nav.Link href="/customer/profile">Профиль</Nav.Link>
        </>
    } else if (tokenData?.Role === UserTypes.EXECUTOR){
        return <>
            <Nav.Link href="/executor/profile">Профиль</Nav.Link>
        </>
    } else {
        return <>
            <Alert variant='danger' message='unknown auth state'></Alert>
        </>
    }
}

export const Navigation = () => {
    return (
        <Navbar
            bg="light"
            expand="lg"
            className="mb-5 pt-2 pb-2"
        >
            <Container>
                <Brand />
                <Nav className="ml-auto">
                    <NavigationContent />
                </Nav>
            </Container>
        </Navbar>
    );
}
