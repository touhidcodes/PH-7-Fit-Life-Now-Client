import React from 'react';

const ProductsCard = ({ item }) => {
	const { _id, image, name, title } = item;
	return (
		<div className='card bg-base-100 shadow-xl'>
			<figure>
				<img src={image} alt='medicine' className='w-80' />
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>{name}</h2>
				<p>{title}</p>
				<div className='card-actions justify-end'>
					<button className='btn rounded-full px-8 bg-red-400 text-white'>
						View Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductsCard;
