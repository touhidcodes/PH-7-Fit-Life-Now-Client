import React from 'react';
import useCart from '../../../hooks/useCart/useCart';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';

const MyCart = () => {
	const [cart, refetch] = useCart();

	const handleDelete = (item) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:5000/carts/${item._id}`, {
					method: 'DELETE',
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount > 0) {
							refetch();
							Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
						}
					});
			}
		});
	};
	return (
		<div className='my-10'>
			<div className='text-xl my-5 font-semibold flex justify-between items-center'>
				<h4 className='text-blue-950'>Total Selected Class: {cart.length}</h4>

				<button
					className='btn btn-info text-white text-xl'
					disabled={cart.length === 0}>
					<Link to='/dashboard/payment'>Pay</Link>
				</button>
			</div>
			{cart.length === 0 && (
				<div>
					<h4 className='text-xl  px-5 font-semibold mb-5'>
						You have not selected any Class!
					</h4>
				</div>
			)}
			<div className='overflow-x-auto'>
				<table className='table'>
					{/* head */}
					<thead className='bg-blue-950 rounded-xl text-xl text-white font-semibold'>
						<tr>
							<th>#</th>
							<th>Product Name</th>
							<th>Price</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody className='text-xl font-semibold'>
						{/* row 1 */}
						{cart.map((row, index) => (
							<tr key={row._id}>
								<th>{index + 1}</th>
								<td>{row?.name}</td>
								<td>$ {row?.price}</td>
								<td>{row?.status}</td>
								<td>
									<button
										className='btn btn-error'
										onClick={() => handleDelete(row)}>
										<AiOutlineDelete className='h-8 w-6 text-white' />
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

export default MyCart;
