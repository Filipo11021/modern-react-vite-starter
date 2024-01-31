import type { FC } from 'react';
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './router-root';
import { Button } from '@/shared/ui/button';

export const HomePage: FC = () => {
	return (
		<div className="p-4">
			<h1>home page</h1>
			<Button onClick={() => alert('click')}>test</Button>
		</div>
	);
};

export const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: HomePage,
});
