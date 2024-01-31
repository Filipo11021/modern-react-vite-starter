import type { FC } from 'react';
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './router-root';

export const HomePage: FC = () => {
	return (
		<div>
			<h1>home page</h1>
		</div>
	);
};

export const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: HomePage,
});
