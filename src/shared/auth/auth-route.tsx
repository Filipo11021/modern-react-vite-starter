import { sessionQueryOptions } from './useSession';
import { Navigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { LoadingPage } from '../loading-page';
import { useQuery } from '@tanstack/react-query';

export function AuthRoute({
	type,
	children,
}: { type: 'signedIn' | 'signedOut'; children: ReactNode }) {
	const session = useQuery(sessionQueryOptions);

	if (session.isLoading) return <LoadingPage />;

	if (type === 'signedIn') {
		if (session.data) {
			return <>{children}</>;
		}

		return <Navigate to="/" />;
	}

	if (type === 'signedOut') {
		if (session.data) {
			return <Navigate to="/app/posts" />;
		}

		return <>{children}</>;
	}

	return null;
}
