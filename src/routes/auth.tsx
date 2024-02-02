import { AuthRoute } from '@/shared/auth/auth-route';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
	component: () => (
		<AuthRoute type="signedOut">
			<div className="pt-[30%] min-h-dvh flex justify-center">
				<Outlet />
			</div>
		</AuthRoute>
	),
});
