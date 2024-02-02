import { env } from '@/shared/env';
import { createFetcher } from './fetcher';

function getAuthToken() {
	return 'test';
}

export const httpClient = createFetcher({
	baseUrl: env.VITE_API_URL,
	options: () => {
		const token = getAuthToken();

		return {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			credentials: 'include',
		};
	},
});
