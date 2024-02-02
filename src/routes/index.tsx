import { AuthRoute } from '@/shared/auth/auth-route';
import { createFileRoute } from '@tanstack/react-router';
import type { ReactElement } from 'react';

export const Route = createFileRoute('/')({
	component: () => (
		<AuthRoute type="signedOut">
			<HomePage />
		</AuthRoute>
	),
});

function HomePage(): ReactElement {
	return (
		<div>
			<h1>hello</h1>
		</div>
	);
}
