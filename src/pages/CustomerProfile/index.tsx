import {
    Container,
    Row,
    Form,
    Button,
    Stack,
    Alert,
    Col,
} from 'react-bootstrap';
import { FormEvent, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMER, SET_CUSTOMER } from '@/requests';
import { Loading } from '@/components/Loading';

export const Content = () => {
    const [name, setName] = useState<string | null>(null);
    const [succcessMessageShown, setSuccessMessageShown] = useState(false);
    const [setCustomer, mutResult] = useMutation(SET_CUSTOMER);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCustomer({ variables: { data: { fullName: name } } });

        setSuccessMessageShown(true);
        setInterval(() => {
            setSuccessMessageShown(false);
        }, 3000);
    };

    const getCustomerResult = useQuery(GET_CUSTOMER);
    useEffect(() => {
        setName(getCustomerResult.data?.selfCustomerProfile?.fullName);
    }, [getCustomerResult.data]);

    if (getCustomerResult.loading) return <Loading />;
    if (getCustomerResult.error)
        return (
            <Alert variant="danger">
                Ошибка: {getCustomerResult.error.message}
            </Alert>
        );

    return (
        <Stack gap={2}>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Название организации</Form.Label>
                        <Form.Control
                            required={true}
                            type="text"
                            placeholder="Название организации"
                            value={name ? name : ''}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="mb-3 mt-3"
                    >
                        Сохранить
                    </Button>
                </Form>
            </Row>
            <Row>
                <Col>
                    {mutResult?.error && (
                        <Alert variant="danger">
                            Ошибка: {mutResult.error.message}
                        </Alert>
                    )}
                    {mutResult?.data && succcessMessageShown && (
                        <Alert variant="success">
                            Данные профиля обновлены
                        </Alert>
                    )}
                </Col>
            </Row>
        </Stack>
    );
};

export const CustomerProfile = () => {
    return (
        <Container>
            <Row>
                <h1>Профиль</h1>
            </Row>
            <Row>
                <Content />
            </Row>
        </Container>
    );
};
