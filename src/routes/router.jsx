import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../pages/Home/Home/Home';
import Shop from '../pages/Shop/Shop';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Login from '../pages/login/Login';
import Registration from '../pages/Registration/Registration';
import PrivateRoutes from './Private/PrivateRoutes';
import Dashboard from '../layouts/Dashboard/Dashboard';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import AllOrders from '../pages/Dashboard/AllOrders/AllOrders';
import PendingOrders from '../pages/Dashboard/PendingOrders/PendingOrders';
import AddProducts from '../pages/Dashboard/AddProducts/AddProducts';
import Welcome from '../pages/Dashboard/Welcome/Welcome';
import MyCart from '../pages/Dashboard/MyCart/MyCart';
import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'shop',
				element: <Shop />,
			},
			{
				path: 'details/:id',
				element: <ProductDetails />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Registration />,
			},
		],
	},
	{
		path: 'dashboard',
		element: (
			<PrivateRoutes>
				<Dashboard />
			</PrivateRoutes>
		),
		children: [
			{
				path: 'welcome',
				element: <Welcome />,
			},
			{
				path: 'allUsers',
				element: <AllUsers />,
			},
			{
				path: 'allOrders',
				element: <AllOrders />,
			},
			{
				path: 'pendingOrders',
				element: <PendingOrders />,
			},
			{
				path: 'addProducts',
				element: <AddProducts />,
			},
			{
				path: 'myCart',
				element: <MyCart />,
			},
			{
				path: 'payment',
				element: <Payment />,
			},
			{
				path: 'history',
				element: <PaymentHistory />,
			},
		],
	},
]);

export default router;
