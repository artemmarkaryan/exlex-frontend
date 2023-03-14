import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [otp, setOTP] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	// const history = useHistory();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {

			// mock
			const response = {
				ok: true
			}

			if (response.ok) {
				// Redirect to dashboard after successful login
				history.push('/dashboard');
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
		<div className="container mt-4">
			<h1>Login</h1>
			{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
			<Form onSubmit={handleLogin}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="otp">
					<Form.Label>One-time Password</Form.Label>
					<Form.Control
						type="password"
						value={otp}
						onChange={(event) => setOTP(event.target.value)}
						required
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
}
