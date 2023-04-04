import { isAuthenticatedAtom, tokenDataAtom } from '@/stores/auth';
import { UserTypes } from '@/types/auth';
import { useAtom } from 'jotai';
import { Alert, Button, Container, Stack } from 'react-bootstrap';

const Buttons = () => {
    const [isAuthenticated] = useAtom(isAuthenticatedAtom);
    const [tokenData] = useAtom(tokenDataAtom);

    if (!isAuthenticated) {
        return (
            <>
                <Button as="a" variant="primary" href="/login">
                    Войти
                </Button>
                <Button as="a" variant="primary" href="/signup">
                    Зарегистрироваться
                </Button>
            </>
        );
    }

    if (tokenData?.Role == UserTypes.CUSTOMER) {
        return (
            <>
                <Button as="a" variant="primary" href="/customer/profile">
                    Перейти в личный кабинет
                </Button>
            </>
        );
    }

    if (tokenData?.Role == UserTypes.EXECUTOR) {
        return (
            <>
                <Button as="a" variant="primary" href="/executor/profile">
                    Перейти в личный кабинет
                </Button>
            </>
        );
    }

    return <Alert variant="danger">Неопознанная роль</Alert>;
};

export const Landing = () => {
    const h1style = {
        fontSize: '5rem',
    };

    return (
        <Container>
            <h1 className="mt-5 mb-5" style={h1style}>
                Добро пожаловать в ExLex
            </h1>

            <Stack direction="horizontal" gap={2}>
                <Buttons />
            </Stack>
        </Container>
    );
};
