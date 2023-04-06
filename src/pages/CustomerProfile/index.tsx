import { Container, Row, Form, Button, Stack, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAtom } from 'jotai';
import { tokenDataAtom } from '@/stores/auth';
import { GET_CUSTOMER, SET_CUSTOMER } from '@/requests';

export const CustomerProfile: React.FC = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [fatal, setFatal] = useState('');
    const [success, setSuccess] = useState('');
    const [td, _] = useAtom(tokenDataAtom);

    useQuery(GET_CUSTOMER, {
        onCompleted: (data: any) => {
            setName(data.customer.fullName);
        },
        onError: (error: any) => {
            setFatal('get customer: ' + error.message);
        },
    });

    const [setCustomer] = useMutation(SET_CUSTOMER, {
        variables: { data: { fullName: name } },
        onCompleted: (data: any) => {
            setSuccess('Данные профиля обновлены');
        },
        onError: (error: any) => {
            setError('set customer: ' + error.message);
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setCustomer();
    };

    return (
        <Container>
            <Stack gap={2}>
                {fatal ? (
                    <>
                        <Alert variant="danger">{fatal}</Alert>
                        <Button href="/">Домой</Button>
                    </>
                ) : (
                    <>
                        <Row>
                            <h1>Профиль</h1>
                        </Row>
                        <Row>
                            <Form onSubmit={handleSubmit}>
                                <Stack gap={2}>
                                    <Form.Group>
                                        <Form.Label>
                                            Название организации
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Название организации"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Сохранить
                                    </Button>
                                    {error && (
                                        <Alert variant="danger">{error}</Alert>
                                    )}
                                    {success && (
                                        <Alert variant="success">
                                            {success}
                                        </Alert>
                                    )}
                                </Stack>
                            </Form>
                        </Row>
                    </>
                )}
            </Stack>
        </Container>
    );
};
