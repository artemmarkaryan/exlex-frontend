import { useState } from 'react'
import { Form, Stack, Button } from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client'
import { useAtom } from 'jotai'
import { Alert } from './Alert'
import { UserTypes } from '@/dict/Dict'
import { parseToken } from '@/util/utils'
import { useNavigate } from 'react-router-dom'

const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($email: String!, $otp: String!) {
    verifyOTP(email: $email, otp: $otp)
  }
`

export const VerifyOTPForm = (props: any) => {
    const [otp, setOTP] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    const [verifyOTP] = useMutation(VERIFY_OTP_MUTATION, {
        variables: { email: props.email, otp: otp },
        onCompleted: (data) => { 
            const token = data.verifyOTP

            setErrorMessage('')
            localStorage.setItem('token', token)
            
            const role = parseToken(token)?.Role

            if (role?.toLowerCase() === UserTypes.CUSTOMER) {
                navigate('/customer/profile')
            } else if (role?.toLowerCase() === UserTypes.EXECUTOR) {
                navigate('/customer/executor')
            } else {
                // todo
                console.log("role", role);
                console.log("token", {
                    "actual": token, // undefined
                    "expected": data.verifyOTP // token string
                });
                alert('VERIFY_OTP_MUTATION returned token with unknown role')
            }
        },
        onError: (error) => { setErrorMessage(error.message) }
    })    

    const handleVerifyOTP = (e: any) => {
        e.preventDefault()
        verifyOTP()
    }

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
    )
}
