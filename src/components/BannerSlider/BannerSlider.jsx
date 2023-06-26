import React from 'react';

const BannerSlider = ({ title, image }) => {
	return (
		<div>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 px-20 py-10 items-center grid-col-reverse'>
				<div className='space-y-5 ml-5'>
					<h4 className='text-6xl font-semibold text-red-400'>{title}</h4>
					<p className='font-semibold'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
						mollitia illo culpa quibusdam blanditiis facere. Quidem iure nemo
						expedita maxime aut? Tempora velit reiciendis quisquam impedit
						assumenda minus, repellendus sed!
					</p>
					<button className='btn rounded-full px-8 bg-red-400 text-white'>
						See More
					</button>
				</div>
				<div>
					<img src={image} alt='' className='w-[500px]' />
				</div>
			</div>
		</div>
	);
};

export default BannerSlider;
