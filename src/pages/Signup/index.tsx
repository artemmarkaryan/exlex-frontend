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
import { UserTypes } from '@/types/auth';
import { useMutation, gql } from '@apollo/client';
import { VerifyOTPForm } from '@/components/VerifyOTPForm';
import { SIGNUP_MUTATION } from '@/requests';

const isDebug = true;

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState(UserTypes.CUSTOMER);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            email: email,
            role: userType,
            debug: isDebug,
        },
        onCompleted: () => {
            setError('');
            setSuccess('Одноразовый код отправлен на почту');
        },
        onError: (error) => {
            setError(error.message);
            setSuccess('');
        },
    });

    const handleOptionChange = (event: any) => {
        setUserType(event.target.value);
    };

    const handleSendOTP = (event: any) => {
        event.preventDefault();
        signup();
    };

    return (
        <>
            <Form onSubmit={handleSendOTP}>
                <Stack gap={4}>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Я заказчик"
                            name={UserTypes.CUSTOMER}
                            value={UserTypes.CUSTOMER}
                            checked={userType === UserTypes.CUSTOMER}
                            onChange={handleOptionChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Я исполнитель"
                            name={UserTypes.EXECUTOR}
                            value={UserTypes.EXECUTOR}
                            checked={userType === UserTypes.EXECUTOR}
                            onChange={handleOptionChange}
                        />
                    </Form.Group>

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
                                disabled={email.length === 0}
                                variant="secondary"
                                type="submit"
                            >
                                Отправить одноразовый пароль
                            </Button>
                        </Stack>
                    </Form.Group>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                </Stack>
            </Form>

            <VerifyOTPForm email={email} />
        </>
    );
};

export const SignupPage = () => {
    return (
        <Container>
            <Row>
                <h1>Регистрация</h1>
            </Row>
            <Row>
                <Col className="col-6">
                    <SignupForm />
                </Col>
            </Row>
        </Container>
    );
};
