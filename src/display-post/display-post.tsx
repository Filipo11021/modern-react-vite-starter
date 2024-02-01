import { createRoute } from '@tanstack/react-router';
import type { FC } from 'react';
import { rootRoute } from '@/shared/root-route';
import { useSuspenseQuery } from '@tanstack/react-query';
import { postQueryOptions } from './data';

export const DisplayPostPage: FC = () => {
	const { postId } = displayPostRoute.useParams();
	const { data } = useSuspenseQuery(postQueryOptions(Number.parseInt(postId)));

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">{data.title}</h1>
			<p>{data.body}</p>
		</div>
	);
};

export const displayPostRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '$postId',
	component: DisplayPostPage,
	loader: ({ context: { queryClient }, params: { postId } }) =>
		queryClient.ensureQueryData(postQueryOptions(Number.parseInt(postId))),
});
