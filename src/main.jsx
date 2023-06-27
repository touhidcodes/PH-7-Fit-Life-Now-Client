import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './routes/router.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthContext from './context/Auth/AuthContext';

// TODO: Use React Helmet to dynamic title

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthContext>
			<RouterProvider router={router} />
		</AuthContext>
	</React.StrictMode>
);
