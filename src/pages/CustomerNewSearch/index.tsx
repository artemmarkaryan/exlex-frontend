import React, { useState } from 'react';
import { Container, Form, Row, Stack } from 'react-bootstrap';

const CreateSearch = () => {
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [education, setEducation] = useState<string | null>(null);
    const [experience, setExperience] = useState<number>(0);
    const [specialities, setSpecialities] = useState<string[]>([]);

    return (
        <Form>
            <Form.Control></Form.Control>
        </Form>
    );
};

export const CustomerSearch: React.FC = () => {
    return (
        <Container>
            <Stack gap={2}>
                <Row>
                    <h1>Новый поиск</h1>
                </Row>
                <Row>
                    <CreateSearch />
                </Row>
            </Stack>
        </Container>
    );
};
