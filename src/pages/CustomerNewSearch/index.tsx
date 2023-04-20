import { Loading } from '@/components/Loading';
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

interface Search {
    title: string | null;
    description: string | null;
    price: number;
    deadline: Date | null;
    experience: number;
    education: string[];
    specialities: string[];
}

const CreateSearch = (props: {
    educationTypes: EducationType[];
    specialities: Speciality[];
}) => {
    const [search, setSearch] = useState<Search>({
        title: null,
        description: null,
        price: 0,
        deadline: null,
        experience: 0,
        education: [],
        specialities: [],
    } as Search);
    const [deadline, setDeadline] = useState<string | null>(null);
    const [searchID, setSearchID] = useState<string | null>(null);

    useEffect(() => {
        if (deadline == null) {
            return;
        }
        const date = new Date(deadline);
        setSearch({ ...search, deadline: new Date(date) });
    }, [deadline]);

    const [createSearch, mutResult] = useMutation(CREATE_SEARCH, {
        variables: {
            data: {
                title: search.title,
                description: search.description,
                price: search.price,
                deadline: {
                    year: search.deadline?.getFullYear(),
                    month: search.deadline?.getMonth(),
                    day: search.deadline?.getDay(),
                },
                requirements: {
                    speciality: search.specialities,
                    workExperience: search.experience,
                    educationType: search.education,
                },
            },
        },
    });

    useEffect(() => {
        mutResult.data ? setSearchID(mutResult.data.searchID) : null;
    }, [mutResult]);

    const handle: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        createSearch();
    };

    return (
        <>
            <Form onSubmit={handle}>
                <fieldset disabled={searchID !== null}>
                    <Stack gap={3} className="mb-3">
                        <Form.Group controlId="title">
                            <Form.Label>Название задачи</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={search.title ? search.title : ''}
                                onChange={(e) =>
                                    setSearch({
                                        ...search,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Описание задачи</Form.Label>
                            <Form.Control
                                required
                                as="textarea"
                                rows={2}
                                type="text"
                                value={
                                    search.description ? search.description : ''
                                }
                                onChange={(e) =>
                                    setSearch({
                                        ...search,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                    </Stack>
                    <Col xs={12} md={6} lg={3}>
                        <Stack gap={3} className="mb-3">
                            <Form.Group controlId="price">
                                <Form.Label>Сумма вознаграждения</Form.Label>
                                <Form.Control
                                    type="price"
                                    value={search.price}
                                    onChange={(e) =>
                                        setSearch({
                                            ...search,
                                            price: +e.target.value,
                                        })
                                    }
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
                                value={search.experience}
                                onChange={(e) =>
                                    setSearch({
                                        ...search,
                                        experience: +e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="education">
                            <Form.Label>Уровень образования</Form.Label>
                            {props.educationTypes.map((e) => (
                                <Form.Check
                                    type="checkbox"
                                    id={e.id}
                                    key={e.id}
                                    label={e.title}
                                    checked={search.education?.includes(e.id)}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSearch({
                                                ...search,
                                                education: [
                                                    ...search.education,
                                                    e.id,
                                                ],
                                            });
                                        } else {
                                            setSearch({
                                                ...search,
                                                education:
                                                    search.education.filter(
                                                        (id) => id !== e.id,
                                                    ),
                                            });
                                        }
                                    }}
                                />
                            ))}
                        </Form.Group>
                        <Form.Group controlId="specialities">
                            <Form.Label>Специализация</Form.Label>
                            {props.specialities.map((s) => (
                                <Form.Check
                                    type="checkbox"
                                    id={s.id}
                                    key={s.id}
                                    label={s.title}
                                    checked={search.specialities?.includes(
                                        s.id,
                                    )}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSearch({
                                                ...search,
                                                specialities: [
                                                    ...search.specialities,
                                                    s.id,
                                                ],
                                            });
                                        } else {
                                            setSearch({
                                                ...search,
                                                specialities:
                                                    search.specialities.filter(
                                                        (id) => id !== s.id,
                                                    ),
                                            });
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
                    {mutResult.error && (
                        <Alert variant="danger">
                            {mutResult.error.message}
                        </Alert>
                    )}
                </Col>
            </Row>
        </>
    );
};

const Content = () => {
    const { loading, error, data } = useQuery(GET_EDUCATION_AND_SPECIALITIES);

    if (loading) return <Loading />;
    if (error) return <Alert variant="danger">Ошибка: {error.message}</Alert>;
    return (
        <Stack gap={2}>
            <Row>
                <h1>Новый поиск</h1>
            </Row>
            <Row>
                <CreateSearch
                    educationTypes={data.educationTypes}
                    specialities={data.specialities}
                />
            </Row>
        </Stack>
    );
};

export const CustomerNewSearch = () => {
    return (
        <Container>
            <Content />
        </Container>
    );
};
