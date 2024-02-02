import { AuthRoute } from '@/shared/auth/auth-route';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app')({
	component: () => (
		<AuthRoute type="signedIn">
			<Outlet />
		</AuthRoute>
	),
});
