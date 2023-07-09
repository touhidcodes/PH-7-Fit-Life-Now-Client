import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthProvider } from '../../../context/Auth/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';

const AddProducts = () => {
	const { user } = useContext(AuthProvider);
	const [axiosSecure] = useAxiosSecure();
	const token = import.meta.env.VITE_IMG_API_KEY;
	const img_hosting_url = `https://api.imgbb.com/1/upload?key=${token}`;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append('image', data.image[0]);

		fetch(img_hosting_url, {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((imgResponse) => {
				// console.log(imgResponse);
				if (imgResponse.success) {
					const imgURL = imgResponse.data.display_url;
					const {
						name,
						email,
						type,
						ratings,
						indications,
						dose,
						description,
						title,
						category,
						price,
						company,
					} = data;

					const indicationArray = indications.split(',');

					axiosSecure
						.post('/products', {
							image: imgURL,
							name,
							email,
							type,
							ratings,
							indications: indicationArray,
							dose,
							description,
							title,
							category,
							company,
							price: parseFloat(price),
						})
						.then((data) => {
							// console.log("after posting new menu item", data.data);
							if (data.data.insertedId) {
								reset();
								Swal.fire({
									position: 'top-end',
									icon: 'success',
									title: 'Item added successfully',
									showConfirmButton: false,
									timer: 1500,
								});
							}
						});
				}
			});
	};
	return (
		<div className='mt-10 mb-5 '>
			<div className='text-center'>
				<h1 className='text-3xl font-semibold'>Add Products</h1>
				<p className='text-blue-950 font-semibold mt-1'>Add Product</p>
			</div>
			<div className='lg:w-[600px] mx-auto mt-5'>
				<div className=' card  p-10 rounded-xl shadow-2xl bg-base-100'>
					<div className='card-body border-dashed border-2 border-blue-950'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>
										Product Name:
									</span>
								</label>
								<input
									type='name'
									placeholder='Product Name'
									name='name'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('name', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>
										Admin Email:
									</span>
									<span className='text-red-500 font-bold ml-2'>*</span>
								</label>
								<input
									type='email'
									placeholder='Email Address'
									name='email'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									defaultValue={user.email}
									readOnly
									{...register('email', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>Type:</span>
									<span className='text-red-500 font-bold ml-2'>*</span>
								</label>
								<input
									type='text'
									placeholder='Class Name'
									name='type'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									required
									{...register('type', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>Ratings:</span>
									<span className='text-red-500 font-bold ml-2'>*</span>
								</label>
								<input
									type='text'
									placeholder='Class Name'
									name='ratings'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									required
									{...register('ratings', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>
										Indications:
									</span>
									<span className='text-red-500 font-bold ml-2'>*</span>
								</label>
								<input
									type='text'
									placeholder='Indications (Separate by comma)'
									name='indications'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									required
									{...register('indications', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>Dose:</span>
								</label>
								<input
									type='text'
									placeholder='Dose'
									name='dose'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('dose', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>
										Description:
									</span>
								</label>
								<input
									type='text'
									placeholder='Product Description'
									name='description'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('description', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>Title:</span>
								</label>
								<input
									type='text'
									placeholder='Title'
									name='title'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('title', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>Category:</span>
								</label>
								<input
									type='text'
									placeholder='Seats'
									name='category'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('category', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>Price:</span>
								</label>
								<input
									type='text'
									placeholder='Price'
									name='price'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('price', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>Company:</span>
								</label>
								<input
									type='text'
									placeholder='Company'
									name='company'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('company', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>
										Product Image:
									</span>
								</label>
								<input
									type='file'
									placeholder='Image'
									name='image'
									className='file-input file-input-bordered file-input-secondary w-full max-w-xs'
									{...register('image')}
								/>
							</div>
							<div className='flex flex-row text-red-500 font-semibold mt-2'>
								<span className=' mr-2'>*</span>
								<p>Fields are required</p>
							</div>
							<input
								type='submit'
								value='Add Product'
								className='form-control mt-4 btn btn-error text-white w-full'
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddProducts;
