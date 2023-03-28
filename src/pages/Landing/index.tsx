import { Button, Container, Stack } from "react-bootstrap"

export const Landing = () => {
    const h1style = {
        fontSize: '5rem'
    }

    return (
        <Container>

            <h1 className="mt-5 mb-5" style={h1style}>
                Добро пожаловать в ExLex
            </h1>
            
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
