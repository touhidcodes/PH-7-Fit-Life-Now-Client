import React, { useEffect, useState } from 'react';
import AxiosBase from '../../hooks/AxiosBase/AxiosBase';
import ProductsCard from '../../components/ProductsCard/ProductsCard';
import Loading from '../../components/Loading/Loading';

const Shop = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AxiosBase.get('products').then((data) => {
			setData(data.data);
			setLoading(false);
		});
	}, []);
	return (
		<div className='bg-base-200'>
			{loading && <Loading loading={loading} />}
			<div className='mx-auto max-w-screen-xl'>
				<h4 className='text-4xl pt-10 ml-5'>Our All Products:</h4>
				<p className='text-red-400 ml-5 text-xl mt-3'>
					____See All Supplements
				</p>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-10 p-5  lg:p-10'>
					{data.map((item) => (
						<ProductsCard key={item._id} item={item} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Shop;
