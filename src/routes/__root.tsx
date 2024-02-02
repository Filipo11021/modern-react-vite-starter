import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: () => {
		return (
			<>
				<QueryClientProvider client={queryClient}>
					<Outlet />
					<TanStackRouterDevtools initialIsOpen={false} />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</>
		);
	},
});
