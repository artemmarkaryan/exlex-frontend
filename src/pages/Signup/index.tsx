import { useState } from 'react';
import { Form, Button, Alert, Stack, Container, Row, Col } from 'react-bootstrap';
import { UserTypes } from '@/dict/Dict';
import { useMutation, gql } from '@apollo/client';
import { VerifyOTPForm } from '@/components/VerifyOTPForm';

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $role: Role!, $debug: Boolean!) {
    signup(email: $email, role: $role, debug: $debug)
  }
`;

const isDebug = true;

const SignupForm = () => {
	const [email, setEmail] = useState('');
	const [userType, setUserType] = useState(UserTypes.CUSTOMER);
	const [otpSent, setOTPSent] = useState(false)
	const [signup, { signupError }] = useMutation(SIGNUP_MUTATION);

	const handleSendOTP = (event: any) => {
		event.preventDefault();

		signup({ variables: { email: email, role: userType, debug: isDebug } });
		if (signupError) {
			setOTPSent(false)	
		} else {
			setOTPSent(true)	
		}
	};

	const handleOptionChange = (event: any) => {
		setUserType(event.target.value);
	};

	const handleToken = (token: any) => {
		alert(token)

		// todo: store token
	};

	return (
		<>
			<Form onSubmit={handleSendOTP}>
				<Stack gap={4}>
					<Form.Group>
						<Form.Check
							type="radio"
							label="Я заказчик"
							name={UserTypes.CUSTOMER}
							value={UserTypes.CUSTOMER}
							checked={userType === UserTypes.CUSTOMER}
							onChange={handleOptionChange}
						/>
						<Form.Check
							type="radio"
							label="Я исполнитель"
							name={UserTypes.EXECUTOR}
							value={UserTypes.EXECUTOR}
							checked={userType === UserTypes.EXECUTOR}
							onChange={handleOptionChange}
						/>
					</Form.Group>

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
								disabled={email.length === 0}
								variant="secondary"
								type="submit"
							>
								Отправить одноразовый пароль
							</Button>
						</Stack>
					</Form.Group>

					{/* Alert to show OTP sent message */}
					{errorMessage && (
						<Alert variant="danger">
							<p>Error: {errorMessage}</p>
						</Alert>
					)}

					{/* Alert to show OTP sent message */}
					{otpSent && (
						<Alert variant="success">
							OTP has been sent to your email. Please check your inbox and enter the OTP below.
						</Alert>
					)}

				</Stack>
			</Form>

			<VerifyOTPForm
				email={email}
				handleToken={handleToken}
			/>

		</>
	)
}

export const SignupPage = () => {
	return (
		<Container>
			<Row >
				<h1>Регистрация</h1>
			</Row>
			<Row>
				<Col className='col-6' >
					<SignupForm />
				</Col>
			</Row>
		</Container>
	);
}
