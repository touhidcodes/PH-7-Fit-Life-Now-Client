import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import AxiosBase from '../../hooks/AxiosBase/AxiosBase';

export const AuthProvider = createContext(null);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthContext = ({ children }) => {
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const signInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};
	const logOut = () => {
		return signOut(auth);
	};
	const googleSignIn = () => {
		return signInWithPopup(auth, googleProvider);
	};
	const updateUserProfile = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			// console.log('auth state changed', currentUser);
			setUser(currentUser);
			// console.log(currentUser);
			setLoading(false);
			// Set JWT to Backend
			if (currentUser) {
				AxiosBase.post('/jwt', { email: currentUser.email }).then((data) => {
					localStorage.setItem('access_token', data.data.token);
					// console.log(data.data.token);
				});
			} else {
				localStorage.removeItem('access_token');
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		auth,
		user,
		loading,
		createUser,
		signInUser,
		logOut,
		googleSignIn,
		updateUserProfile,
	};
	return (
		<AuthProvider.Provider value={authInfo}>{children}</AuthProvider.Provider>
	);
};

export default AuthContext;
