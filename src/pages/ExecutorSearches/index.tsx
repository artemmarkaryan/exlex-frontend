import { APPLY, GET_EXECUTOR_SEARCHES } from '@/requests';
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

    const [apply] = useMutation(APPLY, {
        onError: (e: Error) =>
            setError('Ошибка при отправке отклика: ' + e.message),
    });

    const applyForSearch = (searchID: string) => {
        apply({ variables: { searchID: searchID } });
        setSuccess('Отклик отправлен');
    };

    return (
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
                    onClick={() => applyForSearch(s.id)}
                    className="col-3 mt-3 mb-3"
                    variant="primary"
                    disabled={!!success}
                >
                    Откликнуться
                </Button>

                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
            </Card>
        </Col>
    );
};

export const ExecutorSearches = () => {
    const { error, loading, data } = useQuery(GET_EXECUTOR_SEARCHES);

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
            {data.executorAvailableSearches.length > 0 ? (
                <>
                    <Row className="mb-3">
                        <h1>Поиски</h1>
                    </Row>
                    <Row>
                        {data.executorAvailableSearches.map((s: Search) => {
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
                </>
            ) : (
                <Row>
                    <h1>
                        🙁 Увы!
                        <br />
                        Сейчас для вас нет доступных поисков
                    </h1>
                </Row>
            )}
        </Container>
    );
};
