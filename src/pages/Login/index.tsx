import { useState } from 'react';

import { Form, Button, Alert, Stack, Container, Row, Col } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import { VerifyOTPForm } from '@/components/VerifyOTPForm';
import {useNavigate} from 'react-router'

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $debug: Boolean!) {
    login(email: $email, debug: $debug)
  }
`;

const isDebug = true;

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [otpSent, setOTPSent] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_MUTATION, {
		onCompleted: () => {
			setOTPSent(true);
		},
		onError: (error) => {
			setErrorMessage(error.message)
		}
	});

	const handleSendOTP = (e: any) => {
		e.preventDefault();
		login({ variables: { email, debug: isDebug } });
		
	};

	const handleToken = (token: any) => {
		alert(token)
		// todo: store token
	};

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
							<Button
								type="submit"
								disabled={email.length === 0}
								variant="secondary"
							>
								Отправить одноразовый пароль
							</Button>
						</Stack>
					</Form.Group>
				</Stack>
			</Form>

			{/* Alert to show OTP sent message */}
			{loginError && (
				<Alert variant="danger">
					<p>Error: {loginError.message}</p>
				</Alert>
			)}

			{/* Alert to show OTP sent message */}
			{otpSent && (
				<Alert variant="success">
					OTP has been sent to your email. Please check your inbox and enter the OTP below.
				</Alert>
			)}

			<VerifyOTPForm
				email={email}
				handleToken={handleToken}
			/>

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
	);
};
