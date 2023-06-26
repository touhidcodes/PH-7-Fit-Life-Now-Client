import React, { useState } from 'react';
import AxiosBase from '../../../hooks/AxiosBase/AxiosBase';
import BestProductCard from '../../../components/BestProductCard/BestProductCard';

const BestProducts = () => {
	const [data, setData] = useState([]);
	AxiosBase.get('product/best').then((data) => setData(data.data));
	return (
		<div className='bg-base-200 lg:mt-10'>
			<div className='mx-auto max-w-screen-xl'>
				<h4 className='text-4xl pt-10 ml-5'>Best Seller Products:</h4>
				<p className='text-red-400 ml-5 text-xl mt-3'>
					____See All Supplements
				</p>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-10 p-5  lg:p-10'>
					{data.map((item) => (
						<BestProductCard
							key={item._id}
							id={item._id}
							image={item.image}
							name={item.name}
							title={item.title}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default BestProducts;
