import React, { useEffect, useState } from 'react';
import AxiosBase from '../../hooks/AxiosBase/AxiosBase';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const ProductDetails = () => {
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState([]);
	const params = useParams();

	useEffect(() => {
		AxiosBase.get(`products/${params.id}`).then((data) => {
			setProduct(data.data);
			setLoading(false);
		});
	}, []);

	const { _id, image, name, title, ratings, indications, price, type, dose } =
		product;
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
						{indications?.map((item) => (
							<li>{item}</li>
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
						<button className='btn rounded-full px-8 bg-blue-950 text-white'>
							Add To Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
