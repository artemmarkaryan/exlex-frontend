import { Loading } from '@/components/Loading';
import {
    GET_EDUCATION_AND_SPECIALITIES,
    GET_EXECUTOR,
    SET_EXECUTOR,
} from '@/requests';
import { EducationType } from '@/types/education';
import { Speciality } from '@/types/speciality';
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

interface ExecutorProfile {
    name: string | null;
    experience: number;
    education: string | null;
    specialities: string[];
}
const ProfileForm = (props: {
    educationTypes: EducationType[];
    specialities: Speciality[];
}) => {
    const [profile, setProfile] = useState({
        name: null,
        experience: 0,
        education: null,
        specialities: [],
    } as ExecutorProfile);

    const qResult = useQuery(GET_EXECUTOR);
    const [setExecutor, mutResult] = useMutation(SET_EXECUTOR);
    const [successAlertShown, setSuccessAlertShown] = useState(false);

    useEffect(() => {
        if (!qResult.data) return;
        setProfile({
            name: qResult.data.selfExecutorProfile.fullName,
            experience: qResult.data.selfExecutorProfile.workExperience,
            education: qResult.data.selfExecutorProfile.educationTypeID,
            specialities: qResult.data.selfExecutorProfile.specialization,
        });
    }, [qResult]);

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        setSuccessAlertShown(true);
        setInterval(() => setSuccessAlertShown(false), 3000);
        setExecutor({
            variables: {
                data: {
                    fullName: profile.name,
                    workExperience: profile.experience,
                    educationTypeID: profile.education ? profile.education : '',
                    specialization: profile.specialities,
                },
            },
        });
    };

    if (qResult.loading) return <Loading />;
    if (qResult.error)
        return <Alert variant="danger">Ошибка: {qResult.error.message}</Alert>;

    return (
        <>
            <Form onSubmit={handleFormSubmit} className="mb-3">
                <Stack gap={2} className="mb-3">
                    <Form.Group controlId="fullName">
                        <Form.Label>Полное имя</Form.Label>
                        <Form.Control
                            type="text"
                            value={profile.name ? profile.name : ''}
                            onChange={(e) =>
                                setProfile({ ...profile, name: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="experience">
                        <Form.Label>Опыт работы (лет)</Form.Label>
                        <Form.Control
                            type="number"
                            value={profile.experience}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    experience: +e.target.value,
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="education">
                        <Form.Label>Образование</Form.Label>
                        <Form.Control
                            as="select"
                            type="text"
                            value={profile.education ? profile.education : ''}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    education: e.target.value,
                                })
                            }
                        >
                            <option value={'undefined'}>Не выбрано</option>
                            {props.educationTypes.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="specialities">
                        <Form.Label>Специализация</Form.Label>
                        {props.specialities.map((s) => (
                            <Form.Check
                                type="checkbox"
                                id={s.id}
                                key={s.id}
                                label={s.title}
                                checked={profile.specialities?.includes(s.id)}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        setProfile({
                                            ...profile,
                                            specialities: [
                                                ...profile.specialities,
                                                s.id,
                                            ],
                                        });
                                    } else {
                                        setProfile({
                                            ...profile,
                                            specialities:
                                                profile.specialities.filter(
                                                    (id) => id !== s.id,
                                                ),
                                        });
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

            {successAlertShown && !mutResult.error && (
                <Alert variant="success">Данные обновлены</Alert>
            )}
            {mutResult.error && (
                <Alert variant="danger">{mutResult.error.message}</Alert>
            )}
        </>
    );
};

const Content = () => {
    const { loading, error, data } = useQuery(GET_EDUCATION_AND_SPECIALITIES);

    if (loading) return <Loading />;
    if (error) return <Alert variant="danger">Ошибка: {error.message}</Alert>;
    return (
        <ProfileForm
            educationTypes={data.educationTypes}
            specialities={data.specialities}
        />
    );
};

export const ExecutorProfile = () => {
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
