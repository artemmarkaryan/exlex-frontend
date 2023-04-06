import { GET_EDUCATION_AND_SPECIALITIES } from '@/requests';
import { useQuery } from '@apollo/client';
import React, { FormEventHandler, useState } from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';

const CreateSearch = () => {
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [deadline, setDeadline] = useState<string | null>(null);
    const [education, setEducation] = useState<string | null>(null);
    const [experience, setExperience] = useState<number>(0);
    const [specialities, setSpecialities] = useState<string[]>([]);

    const [educationDict, setEducationDict] = useState([]);
    const [specialitiesDict, setSpecialitiesDict] = useState([]);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useQuery(GET_EDUCATION_AND_SPECIALITIES, {
        onError: (error) => {
            setSuccess(null);
            setError('get education and specialities: ' + error.message);
        },
        onCompleted: (data) => {
            setEducationDict(data.educationTypes);
            setSpecialitiesDict(data.specialities);
        },
    });

    const handle: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Form onSubmit={handle}>
                <Stack gap={3} className="mb-3">
                    <Form.Group controlId="title">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={title ? title : ''}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Описание задачи</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={2}
                            type="text"
                            value={description ? description : ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Stack>
                <Col xs={12} md={6} lg={3}>
                    <Stack gap={3} className="mb-3">
                        <Form.Group controlId="price">
                            <Form.Label>Сумма вознаграждения</Form.Label>
                            <Form.Control
                                type="price"
                                value={price}
                                onChange={(e) => setPrice(+e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="deadline">
                            <Form.Label>Крайний срок исполнения</Form.Label>
                            <Form.Control
                                type="date"
                                value={deadline ? deadline : ''}
                                placeholder={'дата'}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </Form.Group>
                    </Stack>
                </Col>

                <Form.Label className="mt-3">
                    <b>Требования к исполнителю</b>
                </Form.Label>

                <Stack gap={3}>
                    <Form.Group controlId="exprince">
                        <Form.Label>Минимальный стаж (лет)</Form.Label>
                        <Form.Control
                            type="number"
                            value={experience}
                            onChange={(e) => setExperience(+e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="education">
                        <Form.Label>Образование</Form.Label>
                        <Form.Control
                            as="select"
                            type="text"
                            value={education ? education : ''}
                            onChange={(e) => setEducation(e.target.value)}
                        >
                            <option value={'unspecified'}>Не выбрано</option>
                            {Object.values(educationDict).map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="specialities">
                        <Form.Label>Специализация</Form.Label>
                        {Object.values(specialitiesDict).map((s) => (
                            <Form.Check
                                type="checkbox"
                                id={s.id}
                                key={s.id}
                                label={s.title}
                                checked={specialities.includes(s.id)}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        setSpecialities([
                                            ...specialities,
                                            s.id,
                                        ]);
                                    } else {
                                        setSpecialities(
                                            specialities.filter(
                                                (id) => id !== s.id,
                                            ),
                                        );
                                    }
                                }}
                            />
                        ))}
                    </Form.Group>
                </Stack>
                <Button className="mt-3 mb-3" variant="primary" type="submit">
                    Сохранить
                </Button>
            </Form>
        </>
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
