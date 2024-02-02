import { queryOptions } from '@tanstack/react-query';

async function fetchPosts() {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await res.json();

	return data as { title: string; body: string, id: number }[];
}

export const postsQueryOptions = queryOptions({
	queryKey: ['posts'],
	queryFn: async () => {
		await new Promise((res) => setTimeout(res, 4000))
		return fetchPosts()
	},
});
