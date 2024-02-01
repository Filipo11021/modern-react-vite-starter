import { Button } from '@/shared/ui/button';
import { createRoute } from '@tanstack/react-router';
import type { FC } from 'react';
import { rootRoute } from '@/shared/root-route';
import { useSuspenseQuery } from '@tanstack/react-query';
import { postsQueryOptions } from './data';

export const HomePage: FC = () => {
	const { data } = useSuspenseQuery(postsQueryOptions);

	return (
		<div className="p-4 flex flex-col gap-3">
			<h1>home page</h1>
			<Button onClick={() => alert('click')}>test</Button>

			{data.map(({ title, id }) => (
				<h2 key={id}>{title}</h2>
			))}
		</div>
	);
};

export const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: HomePage,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(postsQueryOptions),
});
