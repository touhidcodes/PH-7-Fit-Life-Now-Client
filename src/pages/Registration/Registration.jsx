import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';
import { AuthProvider } from '../../context/Auth/AuthContext';
import AxiosBase from '../../hooks/AxiosBase/AxiosBase';
import Swal from 'sweetalert2';

const Registration = () => {
	const { createUser, updateUserProfile } = useContext(AuthProvider);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		setError('');
		const name = data.name;
		const email = data.email;
		const password = data.password;
		const url = data.url;
		const gender = data.gender;
		const number = data.number;
		const address = data.address;

		createUser(email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// console.log(user);

				updateUserProfile(name, url).then(() => {
					AxiosBase.post('users', {
						name,
						email,
						gender,
						number,
						address,
					}).then((data) => {
						if (data.status === 200) {
							reset();
							Swal.fire({
								position: 'top-end',
								icon: 'success',
								title: 'User created successfully.',
								showConfirmButton: false,
								timer: 1500,
							});
							navigate('/');
						}
					});
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setError(errorMessage);
			});
	};
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className='my-10'>
			<div className='text-center'>
				<h1 className='text-3xl font-semibold'>Register Your Account</h1>
				<p className='text-[#4acdd5] font-semibold mt-1'>Register</p>
			</div>

			<div className=' lg:w-1/2 lg:mx-auto mt-5'>
				<div className=' card  p-10 rounded-xl shadow-2xl bg-base-100'>
					<div className='card-body border-dashed border-2 border-blue-950'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>NAME:</span>
									<span className='text-red-500 font-bold ml-2'>*</span>
								</label>
								<input
									type='name'
									placeholder='Your Name'
									name='name'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									required
									{...register('name', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>
										E-MAIL ADDRESS:
									</span>
									<span className='text-red-500 font-bold ml-2'>*</span>
								</label>
								<input
									type='email'
									placeholder='Email Address'
									name='email'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									required
									{...register('email', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>PASSWORD:</span>
									<span className='text-red-500 font-bold ml-2'>*</span>
								</label>
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder='Enter Your Password'
									name='password'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									required
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									{...register('password', {
										required: true,
										pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
										maxLength: 20,
										minLength: 6,
									})}
								/>
								<div
									className='flex flex-row justify-end items-center mt-2 relative'
									onClick={handleShowPassword}>
									{showPassword ? (
										<BsEyeSlashFill className='h-6 w-6 absolute -top-10 right-4' />
									) : (
										<BsEyeFill className='h-6 w-6 absolute -top-10 right-4' />
									)}
								</div>
								{errors.password?.type === 'pattern' && (
									<p className='mt-1 text-red-400'>
										Password must contain a uppercase and spacial character
									</p>
								)}
								{errors.password?.type === 'minLength' && (
									<p className='mt-1 text-red-400'>
										Password should at least 6 character
									</p>
								)}
								{errors.password?.type === 'maxLength' && (
									<p className='mt-1 text-red-400'>
										Password should not more than 20 character
									</p>
								)}
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>
										CONFIRM PASSWORD:
									</span>
									<span className='text-red-500 font-bold ml-2'>*</span>
								</label>
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder='Confirm Your Password'
									name='confirm_password'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									required
									{...register('confirm-password', { required: true })}
								/>
								<div
									className='flex flex-row justify-end items-center mt-2 relative'
									onClick={handleShowPassword}></div>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>
										PHOTO_URL:
									</span>
									<span className='text-red-500 font-bold ml-2'>*</span>
								</label>
								<input
									type='text'
									placeholder='Photo URL'
									name='url'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									required
									{...register('url', { required: true })}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>GENDER:</span>
								</label>
								<input
									type='text'
									placeholder='gender'
									name='Gender'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('gender')}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>
										CONTACT NUMBER:
									</span>
								</label>
								<input
									type='text'
									placeholder='Contact Number'
									name='number'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('number')}
								/>
							</div>
							<div className='form-control'>
								<label className='label flex flex-row justify-start'>
									<span className='text-gray-500 font-semibold'>ADDRESS:</span>
								</label>
								<input
									type='text'
									placeholder='Address'
									name='address'
									className='bg-base-200 py-2 px-5 rounded-md  outline-offset-4 outline-2 outline-gray-400'
									{...register('address')}
								/>
							</div>
							<div className='flex flex-row text-red-500 font-semibold mt-2'>
								<span className=' mr-2'>*</span>
								<p>Fields are required</p>
							</div>

							<input
								type='submit'
								value='Register'
								className='form-control mt-4 btn btn-error text-white w-full'
							/>
						</form>
						{error ? (
							<div className='text-center font-semibold text-red-400 mt-5'>
								<p>{error}</p>
							</div>
						) : (
							''
						)}
						<div>
							<p className='font-semibold mt-3 text-center'>
								<small>
									Already Have An Account?{' '}
									<Link
										to='/login'
										className='underline text-purple-900 font-bold'>
										Log In Your Account
									</Link>
								</small>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Registration;
