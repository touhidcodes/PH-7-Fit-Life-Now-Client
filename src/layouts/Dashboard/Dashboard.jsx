import React from 'react';

const Dashboard = () => {
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
						<Link to='/dashboard/allUsers'>Manage Users</Link>
					</li>
					<li>
						<Link to='/dashboard/addClassAdmin'>ManageClass</Link>
					</li>
				</>
			)}

			{!isAdmin && (
				<>
					<li>
						<Link to='/dashboard/myCart'>My Selected Classes</Link>
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
					<ul className='menu p-4 w-80 h-full bg-purple-900 text-base-content rounded-xl'>
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
