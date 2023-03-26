import { useState } from 'react';
import { Form, Stack, Button } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';

const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($email: String!, $otp: String!) {
    verifyOTP(email: $email, otp: $otp)
  }
`;

export const VerifyOTPForm = (props) => {
  const [otp, setOTP] = useState('');
  const [verifyOTP, { error: verifyOTPError }] = useMutation(VERIFY_OTP_MUTATION);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verifyOTP({ variables: { email: props.email, otp: otp } });
      
      props.handleToken(data.verifyOTP);
    
    } catch (error) {
      console.error(error);
    }
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

        <Button
          disabled={otp.length === 0}
          variant="primary"
          type="submit"
        >
          Войти
        </Button>

        {verifyOTPError && <p>Error: {verifyOTPError.message}</p>}
      </Stack>
    </Form>
  );
};
