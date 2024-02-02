import { env } from '@/shared/env';
import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

export const worker = setupWorker(
	http.post<object, { username: string; password: string }>(
		`${env.VITE_API_URL}/login`,
		async ({ request }) => {
			const { password, username } = await request.json();
			if (password === 'test' && username === 'test')
				return HttpResponse.json({ token: 'test' });

			return HttpResponse.json({ message: 'złe dane' }, { status: 400 });
		}
	),
  //@ts-expect-error two return types not work
	http.get(`${env.VITE_API_URL}/me`, ({ request }) => {
		const token = request.headers.get('Authorization');

		if (token) return HttpResponse.json({ user: { username: 'test' } });

		return HttpResponse.json(
			{ message: 'nie masz tu dostepu' },
			{ status: 401 }
		);
	})
);

export async function enableMocking() {
	if (env.NODE_ENV !== 'development') {
		return;
	}

	const { worker } = await import('./browser-mock');
	return worker.start();
}
