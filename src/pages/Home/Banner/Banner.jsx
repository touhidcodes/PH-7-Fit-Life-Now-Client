import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import BannerSlider from '../../../components/BannerSlider/BannerSlider';
import 'swiper/css';
import 'swiper/css/navigation';
import image1 from '../../../assets/images/banner/doctor.jpg';
import image2 from '../../../assets/images/banner/eat.jpg';
import image3 from '../../../assets/images/banner/medicine.png';

const Banner = () => {
	return (
		<div className='mx-auto max-w-screen-xl'>
			<Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
				<SwiperSlide>
					<BannerSlider title='Your Health Our Concern' image={image1} />
				</SwiperSlide>
				<SwiperSlide>
					<BannerSlider title='Improve Yourself Daily' image={image2} />
				</SwiperSlide>
				<SwiperSlide>
					<BannerSlider title='We Value Your Health' image={image3} />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Banner;
