import { gql } from '@apollo/client';

export const SET_EXECUTOR = gql`
    mutation setExecutorProfile($data: SetExecutorProfileData!) {
        setExecutorProfile(data: $data)
    }
`;

export const GET_EXECUTOR = gql`
    query selfExecutorProfile {
        selfExecutorProfile {
            fullName
            workExperience
            educationTypeID
            specialization
        }
    }
`;

export const GET_CUSTOMER = gql`
    query SelfCustomerProfile {
        selfCustomerProfile {
            fullName
        }
    }
`;

export const SET_CUSTOMER = gql`
    mutation SetCustomerProfile($data: SetCustomerProfileData!) {
        setCustomerProfile(data: $data)
    }
`;

export const GET_EDUCATION_AND_SPECIALITIES = gql`
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

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $debug: Boolean!) {
        login(email: $email, debug: $debug)
    }
`;

export const SIGNUP_MUTATION = gql`
    mutation Signup($email: String!, $role: Role!, $debug: Boolean!) {
        signup(email: $email, role: $role, debug: $debug)
    }
`;

export const CREATE_SEARCH = gql`
    mutation createSearch($data: CreateSearchInput!) {
        createSearch(data: $data)
    }
`;

export const GET_CUSTOMER_SEARCHES = gql`
    query searches {
        customerSearches {
            id
            title
            description
            price
            createdAt
            deadline {
                year
                month
                day
            }
            requirements {
                educationType
                speciality
                workExperience
            }
        }
        educationTypes {
            id
            title
        }
        specialities {
            id
            title
        }
    }
`;

export const GET_EXECUTOR_SEARCHES = gql`
    query searches {
        executorAvailableSearches {
            id
            title
            description
            price
            createdAt
            deadline {
                year
                month
                day
            }
            requirements {
                educationType
                speciality
                workExperience
            }
        }
        educationTypes {
            id
            title
        }
        specialities {
            id
            title
        }
    }
`;

export const DELETE_SEARCH = gql`
    mutation deleteSearch($id: ID!) {
        deleteSearch(id: $id)
    }
`;

export const APPLY = gql`
    mutation applyForSearch($searchID: ID!, $comment: String) {
        applyForSearch(searchID: $searchID, comment: $comment)
    }
`;

export const GET_CUSTOMER_SEARCH = gql`
    query customerSearch($id: ID!) {
        customerSearch(id: $id) {
            id
            title
            description
            price
            createdAt
            deadline {
                year
                month
                day
            }
            requirements {
                educationType
                speciality
                workExperience
            }
        }
    }
`;

export const GET_APPLICANTS = gql`
    query applications($id: ID!) {
        customerSearchApplications(id: $id) {
            id
            createdAt
            comment
            applicant {
                fullName
                workExperience
                educationTypeID
                specialization
            }
        }
    }
`;
