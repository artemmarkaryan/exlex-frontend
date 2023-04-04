import { tokenDataAtom } from '@/stores/auth';
import { gql, useQuery } from '@apollo/client';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Row, Stack } from 'react-bootstrap';

const GET_EXECUTOR = gql`
    query selfExecutorProfile($id: ID!) {
        selfExecutorProfile(id: $id) {
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

export const ExecutorProfile: React.FC = () => {
    const [tokenData] = useAtom(tokenDataAtom);

    const [error, setError] = useState('');
    const [educationDict, setEducationDict] = useState([]);
    const [specialitiesDict, setSpecialitiesDict] = useState([]);
    const [fullName, setFullName] = useState('');
    const [experience, setExperience] = useState(0);
    const [education, setEducation] = useState('');
    const [specialities, setSpecialities] = useState([]);

    useQuery(GET_EXECUTOR, {
        variables: { id: tokenData ? tokenData.UserID : '' },
        onError: (error) => setError(error.message),
        onCompleted: (data) => {
            const profile = data.selfExecutorProfile;
            setFullName(profile.fullName);
            setExperience(profile.workExperience);
            setEducation(profile.educationTypeID);
            setSpecialities(profile.specialization);
        },
    });

    useQuery(GET_EDUCATION_AND_SPECIALITIES, {
        onError: (error) => setError(error.message),
        onCompleted: (data) => {
            setEducationDict(data.educationTypes);
            setSpecialitiesDict(data.specialities);
        },
    });

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
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
            <Row>
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
                                {Object.values(educationDict).map(
                                    (education) => (
                                        <option
                                            key={education.id}
                                            value={education.title}
                                        >
                                            {education.title}
                                        </option>
                                    ),
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="specialities">
                            <Form.Label>Специализация</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                value={specialities}
                                onChange={(e) =>
                                    setSpecialities(
                                        Array.from(
                                            e.target.selectedOptions,
                                            (option) => option.value,
                                        ),
                                    )
                                }
                            >
                                {Object.values(specialitiesDict).map(
                                    (speciality) => (
                                        <option
                                            key={speciality.id}
                                            value={speciality.title}
                                        >
                                            {speciality.title}
                                        </option>
                                    ),
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Stack>
                </Form>
            </Row>
        </Container>
    );
};
