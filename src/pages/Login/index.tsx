import { useState } from 'react'
import { Form, Button, Stack, Container, Row, Col } from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client'
import { VerifyOTPForm } from '@/components/VerifyOTPForm'
import { Alert } from '@/components/Alert'

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $debug: Boolean!) {
    login(email: $email, debug: $debug)
  }
`

const isDebug = true

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: { email: email, debug: isDebug } ,
        onCompleted: () => {
            setErrorMessage('')
            setSuccessMessage('Одноразовый код отправлен на почту')
        },
        onError: (error) => {
            setErrorMessage(error.message)
            setSuccessMessage('')
        }
    })

    const handleSendOTP = (e: any) => {
        e.preventDefault()
        login()  
    }

    return (
        <Stack gap={2}>
            <Form onSubmit={handleSendOTP}>
                <Stack gap={4}>
                    <Form.Group controlId="email">
                        <Stack gap={2}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            <Button type="submit" disabled={email.length === 0} variant="secondary">
                                Отправить одноразовый пароль
                            </Button>
                        </Stack>
                    </Form.Group>
                </Stack>
            </Form>

            <Alert variant="danger" message={errorMessage} />
            <Alert variant="success" message={successMessage} />

            <VerifyOTPForm email={email}/>

        </Stack>
    )
}

export const LoginPage = () => {
    return (
        <Container>
            <Row >
                <h1>Вход</h1>
            </Row>
            <Row>
                <Col className='col-6' >
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    )
}
