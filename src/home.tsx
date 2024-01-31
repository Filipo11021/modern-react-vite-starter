import { Button } from '@/shared/ui/button';
import { createRoute } from '@tanstack/react-router';
import type { FC } from 'react';
import { rootRoute } from './router-root';

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
