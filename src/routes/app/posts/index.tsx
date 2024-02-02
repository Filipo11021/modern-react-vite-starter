import { LoadingPage } from '@/shared/loading-page';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import type { ReactElement } from 'react';
import { postsQueryOptions } from './-data';

export const Route = createFileRoute('/app/posts/')({
	component: PostsPage,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(postsQueryOptions),
	pendingComponent: LoadingPage,
});

function PostsPage(): ReactElement {
	const { data } = useSuspenseQuery(postsQueryOptions);

	return (
		<div className="p-4 flex flex-col gap-3">
			<h1>posts</h1>

			<ul>
				{data.map(({ title, id }) => (
					<li key={id}>
						<Link to="/app/posts/$postId" params={{ postId: id.toString() }}>
							{title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
