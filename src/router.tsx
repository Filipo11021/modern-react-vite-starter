import { createRouter } from '@tanstack/react-router';
import { queryClient, rootRoute } from '@/shared/root-route';
import { homeRoute } from '@/home/home';
import { displayPostRoute } from '@/display-post/display-post';

const routeTree = rootRoute.addChildren([homeRoute, displayPostRoute]);

export const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	context: {
		queryClient,
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
