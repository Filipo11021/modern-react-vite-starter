import { createFileRoute } from '@tanstack/react-router';
import type { ReactElement } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { postQueryOptions } from './-data';

export const Route = createFileRoute('/app/posts/$postId/')({
	component: PostPage,
	loader: async ({ context: { queryClient }, params: { postId } }) => {
		await new Promise((res) => setTimeout(res, 4000));
		queryClient.ensureQueryData(postQueryOptions(Number.parseInt(postId)));
	},
});

function PostPage(): ReactElement {
	const { postId } = Route.useParams();
	const { data } = useSuspenseQuery(postQueryOptions(Number.parseInt(postId)));

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">{data.title}</h1>
			<p>{data.body}</p>
		</div>
	);
}
