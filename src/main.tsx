import { queryClient } from '@/routes/__root';
import { env } from '@/shared/env';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { routeTree } from './routeTree.gen';

export async function enableMocking() {
	if (env.NODE_ENV !== 'development') {
		return;
	}

	const { worker } = await import('./mocks/browser-mock');
	return worker.start();
}

await enableMocking();

// Set up a Router instance
const router = createRouter({
	routeTree,
	context: {
		queryClient: queryClient,
	},
	defaultPreload: 'intent',
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const root = document.getElementById('root');
if (!root) throw Error('unknown root element');

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
