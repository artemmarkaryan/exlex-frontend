import {
    DELETE_SEARCH,
    GET_EDUCATION_AND_SPECIALITIES,
    GET_SEARCHES,
} from '@/requests';
import { EducationType } from '@/types/education';
import { Search } from '@/types/search';
import { Speciality } from '@/types/speciality';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
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
    console.log('rendering search card' + props.search.id);
    const s = props.search;
    const d = new Date(s.createdAt);

    const [educations, setEducations] = useState<JSX.Element[]>([]);
    const [specialities, setSpecialities] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setEducations(
            s.requirements.educationType.map((requiredEducation: string) => {
                const et = props.educations.find((element: EducationType) => {
                    return element.id === requiredEducation;
                });
                return et ? (
                    <li key={props.search.id + '-' + et.id}>{et.title}</li>
                ) : (
                    <></>
                );
            }),
        );
        setSpecialities(
            s.requirements.speciality.map((requiredSpeciality: string) => {
                const s = props.specialities.find((element: Speciality) => {
                    return element.id === requiredSpeciality;
                });

                return s ? (
                    <li key={props.search.id + '-' + s.id}>{s.title}</li>
                ) : (
                    <></>
                );
            }),
        );
    }, [props]);

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

    return hidden ? (
        <></>
    ) : (
        <Col className="col-12 col-lg-6">
            <Card className="p-4 custom-card" id={s.id}>
                <h3 className="mb-4">{s.title ? s.title : 'Безымянный'}</h3>
                <p>{s.description}</p>
                <p>Вознаграждение: {s.price}р.</p>
                <p>Создан: {d.toLocaleString('ru-RU')}</p>

                <b className="mb-3">Требования</b>
                <p>Опыт работы: {s.requirements.workExperience}</p>

                <p className="mb-0">Образование:</p>
                <ul>{educations.length > 0 ? educations : <li>Любое</li>}</ul>
                <p className="mb-0">Специальность</p>
                <ul>
                    {specialities.length > 0 ? specialities : <li>Любая</li>}
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

export const CustomerSearches = () => {
    const { error, loading, data } = useQuery(GET_SEARCHES);

    if (loading)
        return (
            <Container>
                <Row>
                    <p>Загрузка...</p>
                </Row>
            </Container>
        );

    if (error)
        return (
            <Container>
                <Row>
                    <Alert variant="danger">{error.message}</Alert>
                </Row>
            </Container>
        );

    return (
        <Container>
            <Row className="mb-3">
                <h1>Поиски</h1>
            </Row>
            <Row>
                {data.searches.map((s: Search) => {
                    return (
                        <SearchCard
                            key={'search-card-' + s.id}
                            educations={data.educationTypes}
                            specialities={data.specialities}
                            search={s}
                        />
                    );
                })}
            </Row>
        </Container>
    );
};
