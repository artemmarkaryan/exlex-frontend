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
