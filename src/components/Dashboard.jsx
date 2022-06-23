import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
	const [ error, setError ] = useState('');
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	async function handleLogout() {
		// clear out the error
		setError('');
		try {
			await logout();
			navigate('/login', { replace: true });
		} catch (error) {
			setError('Failed to log out');
		}
	}
	return (
		<React.Fragment>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<strong>Email: </strong>
					{currentUser.email}
					<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
						Update Profile
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Log out
				</Button>
			</div>
		</React.Fragment>
	);
}
