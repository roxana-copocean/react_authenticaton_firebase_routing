import React, { useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
	const emailRef = useRef();

	const { forgotPass } = useAuth();
	const [ error, setError ] = useState('');
	const [ messsage, setMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setMessage('');
			setError('');
			setLoading(true);
			await forgotPass(emailRef.current.value);
			setMessage('Check your inbox for further instructions');
		} catch (error) {
			setError('Faild to reset password');
		}
		setLoading(false);
	}
	return (
		<React.Fragment>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Password Reset</h2>

					{error && <Alert variant="danger">{error}</Alert>}
					{messsage && <Alert variant="success">{messsage}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" required ref={emailRef} />
						</Form.Group>

						<Button type="submit" className="w-100" disabled={loading}>
							Reset Password
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/login">Login</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</React.Fragment>
	);
}
