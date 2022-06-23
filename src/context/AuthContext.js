import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvier({ children }) {
	const [ currentUser, setCurrentUser ] = useState();
	const [ loading, setLoading ] = useState(true);
	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}
	function forgotPass(email) {
		return auth.sendPasswordResetEmail(email);
	}
	function logout() {
		return auth.signOut();
	}
	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}
	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		forgotPass,
		updateEmail,
		updatePassword
	};
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
