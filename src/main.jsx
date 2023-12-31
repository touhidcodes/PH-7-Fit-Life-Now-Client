import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './routes/router.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthContext from './context/Auth/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TODO: Use React Helmet to dynamic title

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthContext>
				<RouterProvider router={router} />
			</AuthContext>
		</QueryClientProvider>
	</React.StrictMode>
);
