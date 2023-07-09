import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthProvider } from '../../context/Auth/AuthContext';
import axios from 'axios';

const axiosSecure = axios.create({
	baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
	const { logOut } = useContext(AuthProvider);
	const navigate = useNavigate();

	useEffect(() => {
		axiosSecure.interceptors.request.use((config) => {
			const token = localStorage.getItem('access_token');
			if (token) {
				config.headers.authorization = `Bearer ${token}`;
			}
			return config;
		});

		axiosSecure.interceptors.response.use(
			(response) => {
				// console.log(response);
				return response;
			},
			async (error) => {
				console.log(error);
				if (
					error.response &&
					(error.response.status === 401 || error.response.status === 403)
				) {
					// await logOut();
					// navigate('/login');
				}
				return Promise.reject(error);
			}
		);
	}, [logOut, navigate]);

	return [axiosSecure];
};

export default useAxiosSecure;
