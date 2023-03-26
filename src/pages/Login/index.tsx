import { useState } from 'react';
import {useNavigate} from 'react-router'

import {
	Form as BootForm,
	Button,
	Alert,
	Stack,
	Container,
	Row,
	Col,
} from 'react-bootstrap';

const Form = () => {
	const [email, setEmail] = useState('');
	const [otp, setOTP] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			// mock
			const response = {
				ok: true,
			};

			if (response.ok) {
				// Redirect to dashboard after successful login
				navigate('/dashboard');
			} else {
				// Display error message if login fails
				setErrorMessage('Invalid email or one-time password');
			}
		} catch (error) {
			console.error(error);
			setErrorMessage('An error occurred. Please try again later.');
		}
	};

	return (
		<BootForm onSubmit={handleLogin}>
			{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
			<Stack gap={4}>
				<BootForm.Group controlId="email">
					<Stack gap={2}>
						<BootForm.Label>Email</BootForm.Label>
						<BootForm.Control
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
						<Button variant="secondary">
                            Отправить одноразовый пароль
						</Button>
					</Stack>
				</BootForm.Group>

				<BootForm.Group controlId="otp">
					<BootForm.Label>
                        Одноразовый пароль из письма
					</BootForm.Label>
					<BootForm.Control
						type="password"
						value={otp}
						onChange={(event) => setOTP(event.target.value)}
						required
					/>
				</BootForm.Group>

				<Button variant="primary" type="submit">
                    Войти
				</Button>
			</Stack>
		</BootForm>
	);
};

export const Login = () => {
	return (
		<Container>
			<Row>
				<h1>Вход</h1>
			</Row>
			<Row>
				<Col>
					<Form />
				</Col>
			</Row>
		</Container>
	);
};
