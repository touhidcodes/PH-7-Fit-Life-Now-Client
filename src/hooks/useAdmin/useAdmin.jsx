import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
import { AuthProvider } from '../../context/Auth/AuthContext';
import { useContext } from 'react';

const useAdmin = () => {
	const { user, loading } = useContext(AuthProvider);
	const [axiosSecure] = useAxiosSecure();
	// use axios secure with react query
	const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
		queryKey: ['isAdmin', user?.email],
		enabled: !loading,
		queryFn: async () => {
			const res = await axiosSecure.get(`/users/admin/${user?.email}`);
			// console.log(res.data.admin);
			return res.data.admin;
		},
	});
	return [isAdmin, isAdminLoading];
};
export default useAdmin;
