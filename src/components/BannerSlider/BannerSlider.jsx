import React from 'react';

const BannerSlider = ({ title, image }) => {
	return (
		<div>
			<div className='grid grid-cols-2 gap-10 p-20 items-center'>
				<div className='space-y-5 ml-5'>
					<h4>{title}</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
						mollitia illo culpa quibusdam blanditiis facere. Quidem iure nemo
						expedita maxime aut? Tempora velit reiciendis quisquam impedit
						assumenda minus, repellendus sed!
					</p>
					<button className='btn'>See More</button>
				</div>
				<div>
					<img src={image} alt='' className='w-[500px]' />
				</div>
			</div>
		</div>
	);
};

export default BannerSlider;
