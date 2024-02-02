import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

const sessionSchema = z.object({
	user: z.object({
		username: z.string(),
	}),
});

export type Session = z.infer<typeof sessionSchema>;

export const sessionQueryOptions = queryOptions({
	queryKey: ['session'],
	queryFn: () => null,
});
