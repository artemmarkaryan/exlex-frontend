import {
    DELETE_SEARCH,
    GET_EDUCATION_AND_SPECIALITIES,
    GET_SEARCHES,
} from '@/requests';
import { EducationType } from '@/types/education';
import { Search } from '@/types/search';
import { Speciality } from '@/types/speciality';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Row,
    Stack,
} from 'react-bootstrap';
import './styles.css';

const SearchCard = (props: {
    educations: EducationType[];
    specialities: Speciality[];
    search: Search;
}) => {
    const s = props.search;
    const d = new Date(s.createdAt);

    const educations: JSX.Element[] = Object.values(
        s.requirements.educationType,
    ).map((requiredEducation: string) => {
        const et = props.educations.find((element: EducationType) => {
            return element.id === requiredEducation;
        });
        return <li key={et?.id}>{et ? et.title : ''}</li>;
    });

    const specialities: JSX.Element[] = Object.values(
        s.requirements.speciality,
    ).map((requiredSpeciality: string) => {
        const s = props.specialities.find((element: Speciality) => {
            return element.id === requiredSpeciality;
        });
        return <li key={s?.id}>{s ? s.title : ''}</li>;
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [deleteSearch] = useMutation(DELETE_SEARCH, {
        onCompleted: (data: any) => {
            setSuccess('Поиск удалён');
        },
        onError: (error: any) => {
            setError('dailed to delete: ' + error.message);
        },
    });

    const [hidden, setHidden] = useState(false);

    if (!hidden)
        return (
            <Col className="col-12 col-lg-6">
                <Card className="p-4 custom-card">
                    <h3 className="mb-4">{s.title ? s.title : 'Безымянный'}</h3>
                    <p>{s.description}</p>
                    <p>Вознаграждение: {s.price}р.</p>
                    <p>Создан: {d.toLocaleString('ru-RU')}</p>

                    <b>Требования</b>
                    <p className="mb-0">Образование:</p>
                    <ul>
                        {educations.length > 0 ? educations : <li>Любое</li>}
                    </ul>
                    <p className="mb-0">Специальность</p>
                    <ul>
                        {specialities.length > 0 ? (
                            specialities
                        ) : (
                            <li>Любая</li>
                        )}
                    </ul>

                    <Button
                        onClick={() => {
                            deleteSearch({ variables: { id: s.id } });
                            setInterval(() => {
                                setHidden(true);
                            }, 2000);
                        }}
                        className="col-3 mt-3 mb-3"
                        variant="danger"
                    >
                        Удалить
                    </Button>

                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                </Card>
            </Col>
        );
};

const Content = () => {
    const [error, setError] = useState<string | null>(null);
    const [educationDict, setEducationDict] = useState<EducationType[]>([]);
    const [specialitiesDict, setSpecialitiesDict] = useState<Speciality[]>([]);
    const [searches, setSearches] = useState<Search[]>([]);
    useQuery(GET_SEARCHES, {
        onError: (error: any) => {
            setError('get searches: ' + error.message);
        },
        onCompleted: (data: any) => {
            setSearches(data.searches);
        },
    });
    useQuery(GET_EDUCATION_AND_SPECIALITIES, {
        onError: (error: any) => {
            setError('get education and specialities: ' + error.message);
        },
        onCompleted: (data: any) => {
            setEducationDict(data.educationTypes);
            setSpecialitiesDict(data.specialities);
        },
    });

    return (
        <>
            {Object.values(searches).map((s: Search) => {
                return (
                    <SearchCard
                        key={s.id}
                        educations={educationDict}
                        specialities={specialitiesDict}
                        search={s}
                    />
                );
            })}
        </>
    );
};

export const CustomerSearches = () => {
    return (
        <Container>
            <Row className="mb-3">
                <h1>Поиски</h1>
            </Row>
            <Row>
                <Content />
            </Row>
        </Container>
    );
};
