import { queryOptions } from '@tanstack/react-query';

async function fetchPost({ id }: { id: number }) {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
	const data = await res.json();

	return data as { title: string; body: string };
}

export const postQueryOptions = (postId: number) =>
	queryOptions({
		queryKey: ['post', postId],
		queryFn: () => fetchPost({ id: postId }),
	});
