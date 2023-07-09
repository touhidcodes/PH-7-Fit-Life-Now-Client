import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../../context/Auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { CiDeliveryTruck } from 'react-icons/ci';
import Swal from 'sweetalert2';

const AllOrders = () => {
	const [axiosSecure] = useAxiosSecure();
	const { user } = useContext(AuthProvider);

	const { data: carts = [], refetch } = useQuery(['carts'], async () => {
		const res = await axiosSecure.get(`/carts/all?email=${user?.email}`);
		// console.log(axiosSecure);
		return res.data;
	});

	const handleDelivered = (item) => {
		console.log(item._id);
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, deliver it!',
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:5000/delivered/${item._id}`, {
					method: 'PATCH',
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.modifiedCount > 0) {
							refetch();
							Swal.fire('Updated!', 'Your file has been delivered.', 'success');
						}
					});
			}
		});
	};
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
							<th>Customer Name</th>
							<th>Product</th>
							<th>Price</th>
							<th>Status</th>
							<th>Deliver</th>
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
											<div className='font-bold'>{row?.user_name}</div>
											<div className='text-sm opacity-80'>{row?.email}</div>
										</div>
									</div>
								</td>

								<td>{row?.name}</td>
								<td>$ {row?.price}</td>
								<td> {row?.status}</td>
								<td>
									<button
										className='btn btn-error'
										onClick={() => handleDelivered(row)}
										disabled={row?.status === 'Delivered'}>
										<CiDeliveryTruck className='h-8 w-6 text-white' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllOrders;
