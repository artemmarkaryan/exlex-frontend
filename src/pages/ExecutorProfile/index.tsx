import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row,
    Stack,
} from 'react-bootstrap';

const GET_EXECUTOR = gql`
    query selfExecutorProfile {
        selfExecutorProfile {
            fullName
            workExperience
            educationTypeID
            specialization
        }
    }
`;

const GET_EDUCATION_AND_SPECIALITIES = gql`
    query getEducationAndSpecialities {
        specialities {
            id
            title
        }
        educationTypes {
            id
            title
        }
    }
`;

const SET_EXECUTOR = gql`
    mutation setExecutorProfile($data: SetExecutorProfileData!) {
        setExecutorProfile(data: $data)
    }
`;

export const ExecutorProfile: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [educationDict, setEducationDict] = useState([]);
    const [specialitiesDict, setSpecialitiesDict] = useState([]);

    const [fullName, setFullName] = useState('');
    const [experience, setExperience] = useState(0);
    const [education, setEducation] = useState(null);
    const [specialities, setSpecialities] = useState([]);

    useQuery(GET_EXECUTOR, {
        onError: (error) => setError('get executor: ' + error.message),
        onCompleted: (data) => {
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
                educationTypeID: education ? education.id : '',
                specialization: specialities ? specialities : [],
            },
        },
        onError: (error) => {
            setSuccess(null);
            setError('set executor: ' + error.message);
        },
        onCompleted: () => {
            setSuccess('Данные обновлены');
        },
    });

    useEffect(() => {
        console.log({
            what: 'data changed',
            fullName: fullName,
            experience: experience,
            education: education,
            specialities: specialities,
        });
    }, [fullName, experience, education, specialities]);

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

    const handleFormSubmit = (event: any) => {
        setSuccess(null);
        setError(null);
        event.preventDefault();
        console.log({
            what: 'form submit',
            fullName: fullName,
            experience: experience,
            education: education,
            specialities: specialities,
        });
        setExecutor();
        // Handle form submission logic here
    };

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container>
            <Row>
                <h1>Профиль</h1>
            </Row>
            <Row className="mb-3">
                <Form onSubmit={handleFormSubmit}>
                    <Stack gap={2}>
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
                                value={education}
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

                        <Button variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Stack>
                </Form>
            </Row>

            <Row>
                <Col>
                    {success && <Alert variant="success">{success}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};
