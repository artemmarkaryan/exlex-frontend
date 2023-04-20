import { Loading } from '@/components/Loading';
import {
    DELETE_SEARCH,
    GET_APPLICANTS,
    GET_CUSTOMER_SEARCH,
    GET_EDUCATION_AND_SPECIALITIES,
} from '@/requests';
import { Search } from '@/types/search';
import { titles } from '@/util/titles';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Container,
    Row,
    Stack,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { EducationType } from '@/types/education';
import { Speciality } from '@/types/speciality';

const SearchContent = (props: {
    searchID: string;
    dicts: { specialities: Speciality[]; educationTypes: EducationType[] };
}) => {
    const [educationTitles, setEducationTitles] = useState<string[]>([]);
    const [specialityTitles, setSpecialityTitles] = useState<string[]>([]);
    const [search, setSearch] = useState<Search | null>(null);
    const { loading, error, data } = useQuery(GET_CUSTOMER_SEARCH, {
        variables: { id: props.searchID },
    });

    const [mutSuccess, setMutSuccess] = useState(false);
    const [mutError, setMutError] = useState<{ message: string } | null>(null);
    const [deleteSearch] = useMutation(DELETE_SEARCH, {
        onCompleted: () => setMutSuccess(true),
        onError: (error) => setMutError(error),
    });

    useEffect(() => {
        if (!data) return;
        setSearch(data.customerSearch);
        setEducationTitles(
            titles(
                data.customerSearch.requirements.educationType,
                props.dicts.educationTypes,
            ),
        );
        setSpecialityTitles(
            titles(
                data.customerSearch.requirements.speciality,
                props.dicts.specialities,
            ),
        );
    }, [data, props]);

    if (loading) return <Loading />;
    if (error) return <Alert variant="danger">Ошибка: {error.message}</Alert>;
    if (search)
        return (
            <Card className="custom-card">
                <h1 className="mb-4">
                    {search.title ? search.title : 'Безымянный'}
                </h1>
                <p>{search.description}</p>
                <p>Вознаграждение: {search.price}р.</p>
                <p>
                    Создан: {new Date(search.createdAt).toLocaleString('ru-RU')}
                </p>

                <b className="mb-3">Требования</b>
                <p>Опыт работы: {search.requirements.workExperience}</p>

                <p className="mb-0">Образование:</p>
                <ul>
                    {educationTitles.length > 0 ? educationTitles : 'Любое'}
                </ul>

                <p className="mb-0">Специальность:</p>
                <ul>
                    {specialityTitles.length > 0 ? specialityTitles : 'Любое'}
                </ul>
                <Button
                    onClick={() =>
                        deleteSearch({ variables: { id: search.id } })
                    }
                    className="col-3 mt-3 mb-3"
                    variant="danger"
                    disabled={mutSuccess || !!mutError}
                >
                    Удалить
                </Button>

                {mutSuccess && (
                    <Alert variant="success">
                        <p>Поиск удалён</p>
                        <Button as="a" href="/customer/searches">
                            Список поисков
                        </Button>
                    </Alert>
                )}

                {mutError && (
                    <Alert variant="danger">
                        <p>Ошибка: {mutError?.message}</p>
                    </Alert>
                )}
            </Card>
        );
    return <></>;
};

// sorry for C#
interface IApplication {
    id: string;
    comment: string | null;
    createdAt: string;
    applicant: {
        fullName: string;
        educationTypeID: string;
        workExperience: number;
        specialization: string[];
    };
}

// todo: use dicts from atom stotage
const Application = (props: {
    application: IApplication;
    dicts: { educationTypes: EducationType[]; specialities: Speciality[] };
}) => {
    const [educationTitle, setEducationTitle] = useState<string | null>(null);
    const [specialityTitles, setSpecialityTitles] = useState<string[]>([]);
    useEffect(() => {
        const title = props.dicts.educationTypes.find(
            (e) => e.id === props.application.applicant.educationTypeID,
        )?.title;
        if (title) setEducationTitle(title);

        setSpecialityTitles(
            titles(
                props.application.applicant.specialization,
                props.dicts.specialities,
            ),
        );
    }, [props]);

    return (
        <>
            <Card className="custom-card">
                <Col>
                    <h3>{props.application.applicant.fullName}</h3>
                    <p>
                        Опыт работы:{' '}
                        {props.application.applicant.workExperience}
                    </p>
                    <p>Образование: {educationTitle}</p>
                    <p>Специальности:</p>
                    <ul>
                        {specialityTitles.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>

                    <Stack gap={2} className="col-4">
                        <Button variant="success">Выбрать исполнителя</Button>
                        <Button variant="warning">Отказать</Button>
                    </Stack>
                </Col>
            </Card>
        </>
    );
};

const Applications = (props: {
    searchID: string;
    dicts: { educationTypes: EducationType[]; specialities: Speciality[] };
}) => {
    const { loading, error, data } = useQuery(GET_APPLICANTS, {
        variables: { id: props.searchID },
    });

    if (loading) return <Loading />;
    if (error) return <Alert variant="danger">Ошибка: {error.message}</Alert>;
    return (
        <>
            <h2 className="mb-4">
                Отклики{' '}
                <Badge bg="secondary">
                    {data.customerSearchApplications.length}
                </Badge>
            </h2>
            <Stack gap={3}>
                {data.customerSearchApplications.map((o: IApplication) => {
                    return (
                        <Application
                            key={o.id}
                            application={o}
                            dicts={props.dicts}
                        />
                    );
                })}
            </Stack>
        </>
    );
};

const Content = () => {
    const { id } = useParams<'id'>();
    const { loading, error, data } = useQuery(GET_EDUCATION_AND_SPECIALITIES);

    if (!id) return <></>;
    if (loading) return <Loading />;
    if (error) return <Alert variant="danger">Ошибка: {error.message}</Alert>;
    return (
        <Row>
            <Stack gap={3}>
                <Col xs={12}>
                    <SearchContent searchID={id} dicts={data} />
                </Col>
                <Col xs={12}>
                    <Applications searchID={id} dicts={data} />
                </Col>
            </Stack>
        </Row>
    );
};

export const CustomerSearch = () => {
    return (
        <Container>
            <Row>
                <Content />
            </Row>
        </Container>
    );
};
