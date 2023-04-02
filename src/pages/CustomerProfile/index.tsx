import { Container, Row, Form, FormControl, Button, Stack } from "react-bootstrap"
import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAtom } from "jotai";
import { Alert } from "@/components/Alert";
import { tokenDataAtom } from "@/stores/auth"

const GET_CUSTOMER = gql`
    query GetCustomer($id: ID!) {
        customer(id: $id) {
            fullName
        }
    }
`;

const SET_CUSTOMER = gql`
    mutation SetCustomerProfile($data: SetCustomerProfileData!) {
        setCustomerProfile(data: $data)
    }
`

export const CustomerProfile: React.FC = () => {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [fatalMessage, setFatalMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [td, _] = useAtom(tokenDataAtom)

    useQuery(GET_CUSTOMER, {
        variables: { id: td ? td.UserID : '' },
        onCompleted: (data: any) => { setName(data.customer.fullName) },
        onError: (error: any) => { setErrorMessage(error.message) }
    });

    const [setCustomer] = useMutation(SET_CUSTOMER, {
        variables: { data: { "fullName": name } },
        onCompleted: (data: any) => { setSuccessMessage("Данные профиля обновлены") },
        onError: (error: any) => { setErrorMessage(error.message) }
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setCustomer()
    }

    return (
        <Container>
            <Stack gap={2}>
                <Row>
                    <Alert variant="danger" message={fatalMessage} />
                </Row>
                <Row>
                    <h1>Профиль</h1>
                </Row>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <Stack gap={2}>
                            <Form.Group>
                                <Form.Label>Название организации</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Название организации"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Сохранить
                            </Button>
                            <Alert variant="danger" message={errorMessage} />
                            <Alert variant="success" message={successMessage} />
                        </Stack>
                    </Form>
                </Row>
            </Stack>
        </Container>
    )
}
