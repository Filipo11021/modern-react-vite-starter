import type { FC } from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingPage: FC = () => {
	return (
		<div className="w-full min-h-dvh h-full flex justify-center items-center">
			<Loader2 className="size-32 animate-spin" />
		</div>
	);
};
