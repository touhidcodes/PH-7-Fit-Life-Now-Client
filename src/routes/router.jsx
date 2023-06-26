import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../pages/Home/Home/Home';
import Shop from '../pages/Shop/Shop';

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
		],
	},
]);

export default router;
