import { UserNavButton } from '@/routes/app/-user-nav-button';
import { AuthRoute } from '@/shared/auth/auth-route';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app')({
	component: () => (
		<AuthRoute type="signedIn">
			<div className="flex relative items-center justify-between space-y-2 px-6 py-2">
				<div>
					<h2 className="text-lg font-bold tracking-tight">Welcome back!</h2>
				</div>
				<div className="flex items-center space-x-2">
					<UserNavButton />
				</div>
			</div>

			<Outlet />
		</AuthRoute>
	),
});
