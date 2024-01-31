import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRoute, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { homeRoute } from './home';

const queryClient = new QueryClient();

export const rootRoute = createRootRoute({
	component: () => (
		<>
			<QueryClientProvider client={queryClient}>
				<Outlet />
				<TanStackRouterDevtools initialIsOpen={false} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	),
});

const routeTree = rootRoute.addChildren([homeRoute]);
export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
