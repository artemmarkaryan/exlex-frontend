import { useState } from 'react';
import {
    Form,
    Button,
    Stack,
    Container,
    Row,
    Col,
    Alert,
} from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import { VerifyOTPForm } from '@/components/VerifyOTPForm';
import { LOGIN_MUTATION } from '@/requests';

const isDebug = true;

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: { email: email, debug: isDebug },
        onCompleted: () => {
            setError('');
            setSuccess('Одноразовый код отправлен на почту');
        },
        onError: (error) => {
            setError(error.message);
            setSuccess('');
        },
    });

    const handleSendOTP = (e: any) => {
        e.preventDefault();
        login();
    };

    return (
        <Stack gap={2}>
            <Form onSubmit={handleSendOTP}>
                <Stack gap={4}>
                    <Form.Group controlId="email">
                        <Stack gap={2}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                            <Button
                                type="submit"
                                disabled={email.length === 0}
                                variant="secondary"
                            >
                                Отправить одноразовый пароль
                            </Button>
                        </Stack>
                    </Form.Group>
                </Stack>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <VerifyOTPForm email={email} />
        </Stack>
    );
};

export const LoginPage = () => {
    return (
        <Container>
            <Row>
                <h1>Вход</h1>
            </Row>
            <Row>
                <Col className="col-6">
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    );
};
