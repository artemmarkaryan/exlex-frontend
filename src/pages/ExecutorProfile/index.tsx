import {
    GET_EDUCATION_AND_SPECIALITIES,
    GET_EXECUTOR,
    SET_EXECUTOR,
} from '@/requests';
import { EducationType } from '@/types/education';
import { Speciality } from '@/types/speciality';
import { gql, useQuery, useMutation } from '@apollo/client';

import React, { useState } from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row,
    Stack,
} from 'react-bootstrap';

export const ExecutorProfile: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [educationDict, setEducationDict] = useState<EducationType[]>([]);
    const [specialitiesDict, setSpecialitiesDict] = useState<Speciality[]>([]);

    const [fullName, setFullName] = useState<string>('');
    const [experience, setExperience] = useState<number>(0);
    const [education, setEducation] = useState<string | null>(null);
    const [specialities, setSpecialities] = useState<string[]>([]);

    useQuery(GET_EXECUTOR, {
        onError: (error: any) => setError('get executor: ' + error.message),
        onCompleted: (data: any) => {
            const profile = data.selfExecutorProfile;
            setFullName(profile.fullName);
            setExperience(profile.workExperience);
            setEducation(profile.educationTypeID);
            setSpecialities(profile.specialization);
        },
    });

    const [setExecutor] = useMutation(SET_EXECUTOR, {
        variables: {
            data: {
                fullName: fullName,
                workExperience: experience,
                educationTypeID: education ? education : '',
                specialization: specialities ? specialities : [],
            },
        },
        onError: (error: any) => {
            setSuccess(null);
            setError('set executor: ' + error.message);
        },
        onCompleted: () => {
            setSuccess('Данные обновлены');
        },
    });

    useQuery(GET_EDUCATION_AND_SPECIALITIES, {
        onError: (error: any) => {
            setSuccess(null);
            setError('get education and specialities: ' + error.message);
        },
        onCompleted: (data: any) => {
            setEducationDict(data.educationTypes);
            setSpecialitiesDict(data.specialities);
        },
    });

    const handleFormSubmit = (event: any) => {
        setSuccess(null);
        setError(null);
        event.preventDefault();
        setExecutor();
    };

    return (
        <Container>
            <Row>
                <h1>Профиль</h1>
            </Row>
            <Row>
                <Form onSubmit={handleFormSubmit} className="mb-3">
                    <Stack gap={2} className="mb-3">
                        <Form.Group controlId="fullName">
                            <Form.Label>Полное имя</Form.Label>
                            <Form.Control
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="experience">
                            <Form.Label>Опыт работы (лет)</Form.Label>
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
                                <option value={'unspecified'}>
                                    Не выбрано
                                </option>
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

                    <Button variant="primary" type="submit">
                        Сохранить
                    </Button>
                </Form>
            </Row>

            <Row>
                <Col>
                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};
