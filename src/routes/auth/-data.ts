import { httpClient } from '@/shared/api/api-client';
import { setAuthToken } from '@/shared/auth/auth-token';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const loginDataSchema = z.object({
	username: z.string(),
	password: z.string(),
});
export type LoginData = z.infer<typeof loginDataSchema>;

const loginSuccessResponseSchema = z.object({
	token: z.string(),
});

const loginErrorResponseSchema = z
	.object({
		message: z.string(),
	})
	.transform(({ message }) => message);

function loginMutationFn(data: LoginData) {
	return httpClient('/login', {
		successSchema: loginSuccessResponseSchema,
		errorSchema: loginErrorResponseSchema,
		options: {
			body: JSON.stringify(data),
			method: 'POST',
		},
	});
}

export function useLoginMutation() {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: loginMutationFn,
		onSuccess({ token }) {
			setAuthToken(token);
			queryClient.invalidateQueries();
		},
		onError() {
			setAuthToken('');
			queryClient.invalidateQueries();
		},
	});
	return mutation;
}
