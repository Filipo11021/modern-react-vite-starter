import { httpClient } from '@/shared/api/api-client';
import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

const sessionErrorResponseSchema = z
	.object({
		message: z.string(),
	})
	.transform(({ message }) => message);

const sessionSchema = z.object({
	user: z.object({
		username: z.string(),
	}),
});

function sessionQueryFn() {
	return httpClient('/me', {
		successSchema: sessionSchema,
		errorSchema: sessionErrorResponseSchema,
	});
}

export type Session = z.infer<typeof sessionSchema>;

export const sessionQueryOptions = queryOptions({
	queryKey: ['session'],
	queryFn: sessionQueryFn,
});
