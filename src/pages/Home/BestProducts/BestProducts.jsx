import React, { useState } from 'react';
import AxiosBase from '../../../hooks/AxiosBase/AxiosBase';
import ProductsCard from '../../../components/ProductsCard/ProductsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const BestProducts = () => {
	const [data, setData] = useState([]);
	AxiosBase.get('products/best').then((data) => setData(data.data));
	return (
		<div className='bg-base-200 lg:mt-10'>
			<div className='mx-auto max-w-screen-xl'>
				<h4 className='text-4xl pt-10 ml-5'>Best Seller Products:</h4>
				<p className='text-red-400 ml-5 text-xl mt-3'>
					____See All Supplements
				</p>
				<div className='p-10'>
					<Swiper
						slidesPerView={1}
						spaceBetween={30}
						pagination={{
							clickable: true,
						}}
						breakpoints={{
							640: {
								width: 640,
								slidesPerView: 1,
							},
							768: {
								width: 768,
								slidesPerView: 2,
							},
							1200: {
								width: 1200,
								slidesPerView: 3,
							},
						}}
						modules={[Pagination]}
						className='mySwiper'>
						<div>
							{data.map((item, index) => (
								<SwiperSlide>
									<ProductsCard key={index} item={item} />
								</SwiperSlide>
							))}
						</div>
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default BestProducts;
