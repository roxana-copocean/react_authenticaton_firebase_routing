import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvier } from '../context/AuthContext';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile';

export default function App() {
	return (
		<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
			<div className="w-100" style={{ maxWidth: '400px' }}>
				<BrowserRouter>
					<AuthProvier>
						<Routes>
							<Route
								exact
								path="/"
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
							<Route path="/signup" element={<Signup />} />
							<Route
								path="/update-profile"
								element={
									<PrivateRoute>
										<UpdateProfile />
									</PrivateRoute>
								}
							/>
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/forgot-password" element={<ForgotPassword />} />
						</Routes>
					</AuthProvier>
				</BrowserRouter>
			</div>
		</Container>
	);
}
