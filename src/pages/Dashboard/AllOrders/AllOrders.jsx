import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../../context/Auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';
import { AiOutlineDelete } from 'react-icons/ai';

const AllOrders = () => {
	const [axiosSecure] = useAxiosSecure();
	const { user } = useContext(AuthProvider);

	const { data: carts = [], refetch } = useQuery(['carts'], async () => {
		const res = await axiosSecure.get(`/carts/all?email=${user?.email}`);
		// console.log(axiosSecure);
		return res.data;
	});

	return (
		<div className='my-10'>
			<div className='text-xl my-5 font-semibold'>
				<h4 className='text-blue-950'>Total Orders: {carts.length}</h4>
			</div>
			{carts.length === 0 && (
				<div>
					<h4 className='text-xl  px-5 font-semibold mb-5'>
						You have not order now!
					</h4>
				</div>
			)}
			<div className='overflow-x-auto'>
				<table className='table'>
					{/* head */}
					<thead className='bg-blue-950 rounded-xl text-xl text-white font-semibold'>
						<tr>
							<th>#</th>
							<th>Product</th>
							<th>Customer</th>
							<th>Price</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody className='text-xl font-semibold'>
						{/* row 1 */}
						{carts.map((row, index) => (
							<tr key={row._id}>
								<th>{index + 1}</th>
								<td>
									<div className='flex items-center space-x-3'>
										<div className='avatar'>
											<div className='mask mask-squircle w-12 h-12'>
												<img
													src={row?.image}
													alt='Avatar Tailwind CSS Component'
												/>
											</div>
										</div>
										<div>
											<div className=''>{row?.name}</div>
										</div>
									</div>
								</td>
								<td>
									<div className='space-x-3'>
										<div className='font-bold'>{row?.user_name}</div>
										<div className='text-sm opacity-80'>{row?.email}</div>
									</div>
								</td>
								<td>$ {row?.price}</td>
								<td> {row?.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllOrders;
