import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = ({ loading }) => {
	return (
		<div>
			<div className='flex justify-center pt-3'>
				<ClipLoader color={'red'} loading={loading} size={40} />
			</div>
		</div>
	);
};

export default Loading;
