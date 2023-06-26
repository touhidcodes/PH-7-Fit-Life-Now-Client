import React from 'react';
import { NavLink } from 'react-router-dom';
import './ActiveRoutes.css';

const ActiveRoutes = ({ to, children }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? 'active' : 'not-active')}>
			{children}
		</NavLink>
	);
};

export default ActiveRoutes;
