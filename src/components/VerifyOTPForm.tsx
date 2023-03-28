// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Form, Stack, Button } from 'react-bootstrap';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useAtom } from 'jotai';
import { tokenAtom, tokenDataAtom } from '@/stores/auth';
import { Alert } from './Alert';
import { UserTypes } from '@/dict/Dict';

const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($email: String!, $otp: String!) {
    verifyOTP(email: $email, otp: $otp)
  }
`;

export const VerifyOTPForm = (props: any) => {
    // const history = useHistory();

    const [otp, setOTP] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useAtom(tokenAtom)
    const [tokenData] = useAtom(tokenDataAtom)

    const handleVerifyOTP = (e: any) => {
        e.preventDefault();

        useQuery(VERIFY_OTP_MUTATION, {
            variables: { email: props.email, otp: otp },
            onCompleted: (data) => { 
                setToken(data);
                if (tokenData?.Role === UserTypes.CUSTOMER) {
                    // history.push('/customer/profile')
                } else (
                    // todo
                    alert('VERIFY_OTP_MUTATION returned token with unknown role')
                )
            },
            onError: (error) => { setErrorMessage(error.message) }
        })
    };

    return (
        <Form onSubmit={handleVerifyOTP}>
            <Stack gap={4}>
                <Form.Group controlId="otp">
                    <Form.Label>Одноразовый пароль из письма</Form.Label>
                    <Form.Control
                        type="text"
                        value={otp}
                        onChange={(event) => setOTP(event.target.value)}
                        required
                    />
                </Form.Group>
                <Button disabled={otp.length === 0} variant="primary" type="submit">
                    Войти
                </Button>
                <Alert variant='danger' message={errorMessage} />
            </Stack>
        </Form>
    );
};
