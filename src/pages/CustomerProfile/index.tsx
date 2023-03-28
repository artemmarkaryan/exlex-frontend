import { Container, Row, Form, FormControl, Button } from "react-bootstrap"
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useAtom } from "jotai";
import { Alert } from "@/components/Alert";
import { tokenAtom, tokenDataAtom, tokenData } from "@/stores/auth"

const GET_CUSTOMER = gql`
  query GetCustomer($id: ID!) {
    customer(id: $id) {
      fullName
    }
  }
`;

export const CustomerProfile: React.FC = () => {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [fatalMessage, setFatalMessage] = useState("");
    const [td, _] = useAtom(tokenDataAtom)

    useQuery(GET_CUSTOMER, {
        variables: { id: td ? td.UserID : () => { setFatalMessage("no token") } },
        onCompleted: (data: any) => { setName(data.fullName) },
        onError: (error: any) => { setErrorMessage(error.message) }
    });


    return (
        <Container>
            <Row>
                <Alert variant="danger" message={fatalMessage} />
            </Row>
            <Row>
                <h1>Профиль</h1>
            </Row>
            <Row>
                <Form>
                    <Form.Group>
                        <Form.Label>Text Input:</Form.Label>
                        <FormControl type="text" placeholder="Название организации" value={name} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Сохранить
                    </Button>
                    <Alert variant="danger" message={errorMessage} />
                </Form>
            </Row>
        </Container>
    )
}
