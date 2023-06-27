import React, { useContext } from 'react';
import logo from '../../../assets/images/logo.png';
import ActiveRoutes from '../../../routes/ActiveRoutes/ActiveRoutes';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../../context/Auth/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
	const { user, logOut } = useContext(AuthProvider);
	const navigate = useNavigate();

	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((error) => {});
		navigate('/');
	};
	const navOptions = (
		<>
			<li>
				<ActiveRoutes to='/'>Home</ActiveRoutes>
			</li>
			<li>
				<ActiveRoutes to='/shop'>Shop</ActiveRoutes>
			</li>
			<li>
				<a>Item 3</a>
			</li>
		</>
	);

	return (
		<div className=' bg-blue-950'>
			<div className='navbar text-white mx-auto max-w-screen-xl'>
				<div className='navbar-start'>
					<div className='dropdown'>
						<label tabIndex={0} className='btn btn-ghost lg:hidden'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h8m-8 6h16'
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-red-400 rounded-box w-52'>
							{navOptions}
						</ul>
					</div>
					<div className='flex items-center'>
						<img
							src={logo}
							alt=''
							className='w-10 h-10 lg:w-16 lg:h-16 lg:ml-3'
						/>
						<a className='btn btn-ghost normal-case lg:text-3xl hidden lg:block'>
							Fit Life Now
						</a>
					</div>
				</div>
				<div className='navbar-center hidden lg:flex'>
					<ul className='menu menu-horizontal px-1 text-xl'>{navOptions}</ul>
				</div>
				<div className='navbar-end'>
					<div className='dropdown dropdown-end lg:mr-5 mr-1'>
						{user ? (
							<div className='flex items-center justify-center'>
								<h4 className='lg:mr-5 mr-1 flex items-center'>
									<FaShoppingCart className='w-5 h-5 lg:mr-2 mr-1' />
									<div className='badge badge-secondary'>+0</div>
								</h4>
								<div className='avatar placeholder flex justify-center'>
									<div className='bg-neutral-focus text-neutral-content rounded-full w-12'>
										<img src={user?.photoURL} title={user?.displayName} />
									</div>
								</div>
							</div>
						) : (
							''
						)}
					</div>
					{user ? (
						<div>
							<h4
								className='btn btn-error text-white mr-5 text-sm lg:text-md'
								onClick={handleLogOut}>
								Log Out
							</h4>
						</div>
					) : (
						<h4>
							<Link to='/login' className='btn btn-error text-white mr-5'>
								Login
							</Link>
						</h4>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
