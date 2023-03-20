import { Button, Container, Stack } from "react-bootstrap"

export const Landing = () => {
    return (
        <Container>

            <h1>Добро пожаловать в ExLex</h1>
            <Stack direction="horizontal" gap={2}>
                <Button as="a" variant="primary" href="/login">
                    Войти
                </Button>
                <Button as="a" variant="primary" href="/signup">
                    Зарегистрироваться
                </Button>
            </Stack>

        </Container>
    )
}