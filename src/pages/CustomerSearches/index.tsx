import { DELETE_SEARCH, GET_CUSTOMER_SEARCHES } from '@/requests';
import { EducationType } from '@/types/education';
import { Search } from '@/types/search';
import { Speciality } from '@/types/speciality';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { titles } from '@/util/titles';

const SearchCard = (props: {
    educations: EducationType[];
    specialities: Speciality[];
    search: Search;
}) => {
    const s = props.search;
    const d = new Date(s.createdAt);

    const [educationTitles, setEducationTitles] = useState<string[]>([]);
    const [specialityTitles, setSpecialityTitles] = useState<string[]>([]);

    useEffect(() => {
        setEducationTitles(
            titles(s.requirements.educationType, props.educations),
        );
        setSpecialityTitles(
            titles(s.requirements.speciality, props.specialities),
        );
    }, [props]);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [deleteSearch] = useMutation(DELETE_SEARCH, {
        onCompleted: (data: any) => {
            setSuccess('Поиск удалён');
            setHidden(true);
        },
        onError: (error: any) => {
            setError('dailed to delete: ' + error.message);
        },
    });

    const [hidden, setHidden] = useState(false);

    return (
        <Col className="col-12 col-lg-6">
            <Card className="custom-card">
                <h3 className="mb-4">
                    <a href={'/customer/search/' + s.id}>
                        {s.title ? s.title : 'Безымянный'}
                    </a>
                </h3>
                <p>{s.description}</p>
                <p>Вознаграждение: {s.price}р.</p>
                <p>Создан: {d.toLocaleString('ru-RU')}</p>

                <b className="mb-3">Требования</b>
                <p>Опыт работы: {s.requirements.workExperience}</p>

                <p className="mb-0">Образование:</p>
                <ul>
                    {educationTitles.length > 0 ? educationTitles : 'Любое'}
                </ul>
                <p className="mb-0">Специальность</p>
                <ul>
                    {specialityTitles.length > 0 ? specialityTitles : 'Любая'}
                </ul>

                <Button
                    onClick={() => deleteSearch({ variables: { id: s.id } })}
                    className="col-3 mt-3 mb-3"
                    variant="danger"
                    disabled={hidden}
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
    const { error, loading, data } = useQuery(GET_CUSTOMER_SEARCHES);

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
            {data.customerSearches.length > 0 ? (
                <>
                    <Row className="mb-3">
                        <h1>Поиски</h1>
                    </Row>
                    <Row>
                        {data.customerSearches.map((s: Search) => {
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
                    <Col className="xs-12"></Col>
                    <h1 className="mb-5">
                        Вы пока не создали ни одного поиска
                    </h1>

                    <Col>
                        <Button
                            variant="primary"
                            as="a"
                            href="/customer/search/new"
                        >
                            Создать новый поиск
                        </Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
};
