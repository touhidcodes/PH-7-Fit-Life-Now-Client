import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthProvider } from '../../context/Auth/AuthContext';
import useAdmin from '../../hooks/useAdmin/useAdmin';
import Header from '../../pages/shared/Header/Header';
import Footer from '../../pages/shared/Footer/Footer';

const Dashboard = () => {
	const { user } = useContext(AuthProvider);
	const [isAdmin] = useAdmin();
	const dashboardOptions = (
		<div className='text-xl font-semibold text-white px-5 hover:text-red'>
			<Link>
				<h2 className='mt-10'> Welcome to Dashboard</h2>
				<h2 className=''> {user?.email}</h2>
			</Link>
			<hr className='my-3 mt-5' />

			{isAdmin && (
				<>
					<li>
						<Link to='/dashboard/allUsers'>All Users</Link>
					</li>
					<li>
						<Link to='/dashboard/allUsers'>View All Orders</Link>
					</li>
					<li>
						<Link to='/dashboard/addClassAdmin'>Pending Orders</Link>
					</li>
					<li>
						<Link to='/dashboard/addClassAdmin'>Add Products</Link>
					</li>
				</>
			)}

			{!isAdmin && (
				<>
					<li>
						<Link to='/dashboard/myCart'>My Orders</Link>
					</li>
					<li>
						<Link to='/dashboard/myCart'>My Enrolled Classes</Link>
					</li>
					<li>
						<Link to='/dashboard/payment'>Payment</Link>
					</li>
				</>
			)}
		</div>
	);
	return (
		<div>
			<Header />
			<div className='drawer lg:drawer-open'>
				<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
				<div className='drawer-content flex flex-col items-center justify-center'>
					{/* Page content here */}
					<Outlet />
					<label
						htmlFor='my-drawer-2'
						className='btn btn-primary drawer-button lg:hidden'>
						Open Dashboard
					</label>
				</div>
				<div className='drawer-side'>
					<label htmlFor='my-drawer-2' className='drawer-overlay'></label>
					<ul className='menu p-4 w-80 h-full  bg-blue-950 text-base-content'>
						{/* Sidebar content here */}
						{dashboardOptions}
					</ul>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Dashboard;
