import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthProvider } from '../../context/Auth/AuthContext';

const PrivateRoutes = ({ children }) => {
	const { user, loading } = useContext(AuthProvider);
	const location = useLocation();

	if (loading) {
		return (
			<div>
				<Loading loading={loading} />
			</div>
		);
	}
	if (user) {
		return children;
	}

	return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};
export default PrivateRoutes;
