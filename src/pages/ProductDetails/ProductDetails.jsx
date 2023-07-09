import React, { useContext, useEffect, useState } from 'react';
import AxiosBase from '../../hooks/AxiosBase/AxiosBase';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthProvider } from '../../context/Auth/AuthContext';
import useCart from '../../hooks/useCart/useCart';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin/useAdmin';

const ProductDetails = () => {
	const { user } = useContext(AuthProvider);
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState([]);
	const [isAdmin] = useAdmin();
	const [, refetch] = useCart();
	const params = useParams();

	// TODO: Refetch cart number on header not working

	useEffect(() => {
		AxiosBase.get(`products/${params.id}`).then((data) => {
			setProduct(data.data);
			setLoading(false);
		});
	}, []);

	const { _id, image, name, title, ratings, indications, price, type, dose } =
		product;

	const handleAddToCart = () => {
		if (user) {
			AxiosBase.post('/carts', {
				product_id: _id,
				email: user?.email,
				image,
				name,
				title,
				ratings,
				indications,
				price,
				type,
				dose,
				status: 'pending',
			}).then((data) => {
				// console.log(data);
				if (data.data.insertedId) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Your supplement has been added',
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (data.data.message) {
					refetch();
					Swal.fire('Your Supplement already added!');
				}
			});
		}
	};
	return (
		<div className='mx-auto max-w-screen-xl'>
			{loading && <Loading loading={loading} />}
			<div className='lg:mx-10 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 card-body'>
				<img src={image} alt='' className='rounded-xl' />
				<div className='space-y-3 text-xl'>
					<h2 className='card-title mb-2 text-4xl text-purple-900'>{}</h2>
					<p className='font-semibold text-4xl'>{name}</p>
					<p className='font-semibold text-2xl'>{title}</p>
					<p className='flex'>
						<Rating style={{ maxWidth: 100 }} value={ratings} readOnly />
						<span className='font-semibold ml-3'>{ratings}</span>
					</p>
					<p className='text-4xl text-red-400'>$ {price}</p>
					<p className='font-semibold text-zinc-500'>
						{indications?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</p>
					<p>
						<span>Type: </span>
						<span className='text-purple-900'>{type}</span>
					</p>
					<p>
						<span>Dose: </span>
						<span className='text-purple-900'>{dose}</span>
					</p>
					<div className='card-actions justify-start'>
						<button
							className='btn rounded-full px-8 bg-blue-950 text-white'
							onClick={handleAddToCart}
							disabled={isAdmin}>
							Add To Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
