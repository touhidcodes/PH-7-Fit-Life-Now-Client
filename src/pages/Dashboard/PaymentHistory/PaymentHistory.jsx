import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { AuthProvider } from '../../../context/Auth/AuthContext';

const PaymentHistory = () => {
	const { user } = useContext(AuthProvider);
	const [axiosSecure] = useAxiosSecure();
	const [history, setHistory] = useState([]);
	useEffect(() => {
		axiosSecure.get(`/history?email=${user?.email}`).then((res) => {
			setHistory(res.data);
		});
	}, []);
	console.log(history);
	return (
		<div>
			<h2 className='text-3xl font-semibold mb-5'>Payment History</h2>
			<div className='overflow-x-auto'>
				<table className='table'>
					{/* head */}
					<thead className='bg-blue-950 rounded-xl text-xl text-white font-semibold'>
						<tr>
							<th>Date</th>
							<th>Email</th>
							<th>Price</th>
							<th>Id</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody className='text-sm'>
						{/* row 1 */}
						{history.map((row) => (
							<tr key={row._id}>
								<td>{row?.date}</td>
								<td>{row?.email}</td>
								<td>$ {row?.price}</td>
								<td>{row?.transactionId}</td>
								<th>{row?.status}</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentHistory;
