import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthProvider } from '../../context/Auth/AuthContext';
import useAdmin from '../../hooks/useAdmin/useAdmin';
import Header from '../../pages/shared/Header/Header';
import Footer from '../../pages/shared/Footer/Footer';
import ActiveRoutes from '../../routes/ActiveRoutes/ActiveRoutes';

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
						<ActiveRoutes to='/dashboard/allUsers'>All Users</ActiveRoutes>
					</li>
					<li>
						<ActiveRoutes to='/dashboard/allOrders'>
							View All Orders
						</ActiveRoutes>
					</li>
					<li>
						<ActiveRoutes to='/dashboard/pendingOrders'>
							Pending Orders
						</ActiveRoutes>
					</li>
					<li>
						<ActiveRoutes to='/dashboard/addProducts'>
							Add Products
						</ActiveRoutes>
					</li>
				</>
			)}

			{!isAdmin && (
				<>
					<li>
						<ActiveRoutes to='/dashboard/myCart'>My Orders</ActiveRoutes>
					</li>

					<li>
						<ActiveRoutes to='/dashboard/payment'>Payment</ActiveRoutes>
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
