import { CREATE_SEARCH, GET_EDUCATION_AND_SPECIALITIES } from '@/requests';
import { EducationType } from '@/types/education';
import { Speciality } from '@/types/speciality';
import { useMutation, useQuery } from '@apollo/client';
import React, { FormEventHandler, useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row,
    Stack,
} from 'react-bootstrap';

const CreateSearch = () => {
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [deadline, setDeadline] = useState<string | null>(null);
    const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
    useEffect(() => {
        if (deadline == null) {
            return;
        }
        const date = new Date(deadline);
        setDeadlineDate(new Date(date));
    }, [deadline]);

    const [experience, setExperience] = useState<number>(0);
    const [education, setEducation] = useState<string[]>([]);
    const [specialities, setSpecialities] = useState<string[]>([]);

    const [educationDict, setEducationDict] = useState<EducationType[]>([]);
    const [specialitiesDict, setSpecialitiesDict] = useState<Speciality[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [searchID, setSearchID] = useState<string | null>(null);

    useQuery(GET_EDUCATION_AND_SPECIALITIES, {
        onError: (error: any) => {
            setError('get education and specialities: ' + error.message);
        },
        onCompleted: (data: any) => {
            setEducationDict(data.educationTypes);
            setSpecialitiesDict(data.specialities);
        },
    });

    const [createSearch] = useMutation(CREATE_SEARCH, {
        variables: {
            data: {
                title: title,
                description: description,
                price: price,
                deadline: {
                    year: deadlineDate?.getFullYear(),
                    month: deadlineDate?.getMonth(),
                    day: deadlineDate?.getDay(),
                },
                requirements: {
                    speciality: specialities,
                    workExperience: experience,
                    educationType: education,
                },
            },
        },
        onError: (error: any) => {
            setError(error.message);
            setLoading(false);
        },
        onCompleted: (data: any) => {
            setLoading(false);
            setSearchID(data.createSearch);
            setError(null);
        },
        onLoading: () => setLoading(true),
    });

    const handle: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        createSearch();
    };

    return (
        <>
            <Form onSubmit={handle}>
                <fieldset disabled={searchID !== null || loading}>
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
                                    required
                                    type="date"
                                    value={deadline ? deadline : ''}
                                    placeholder={'дата'}
                                    onChange={(e) =>
                                        setDeadline(e.target.value)
                                    }
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
                            <Form.Label>Уровень образования</Form.Label>
                            {Object.values(educationDict).map((e) => (
                                <Form.Check
                                    type="checkbox"
                                    id={e.id}
                                    key={e.id}
                                    label={e.title}
                                    checked={education?.includes(e.id)}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setEducation([...education, e.id]);
                                        } else {
                                            setEducation(
                                                education.filter(
                                                    (id) => id !== e.id,
                                                ),
                                            );
                                        }
                                    }}
                                />
                            ))}
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
                    <Button
                        className="mt-3 mb-3"
                        variant="primary"
                        type="submit"
                    >
                        Сохранить
                    </Button>
                </fieldset>
            </Form>
            <Row>
                <Col>
                    {searchID && (
                        <Alert variant="success">
                            <p>Поиск создан!</p>
                            <Button
                                as="a"
                                href={'/customer/search/' + searchID}
                            >
                                Перейти
                            </Button>
                        </Alert>
                    )}
                    {error && <Alert variant="danger">{error}</Alert>}
                </Col>
            </Row>
        </>
    );
};

export const CustomerNewSearch: React.FC = () => {
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
