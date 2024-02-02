import type { ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Link, createFileRoute } from '@tanstack/react-router';
import { type LoginData, loginDataSchema, useLoginMutation } from './-data';

export const Route = createFileRoute('/auth/login')({
	component: LoginPage,
});

export function LoginPage(): ReactElement {
	const loginMutation = useLoginMutation();

	const form = useForm<LoginData>({
		resolver: zodResolver(loginDataSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	function onSubmit(values: LoginData) {
		loginMutation.mutate(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 p-4 mb-28 max-w-80 w-full"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="Username" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Link to="/" className="text-sm opacity-70">
						Forgot password
					</Link>
				</div>
				<Button
					disabled={loginMutation.isPending}
					type="submit"
					className="w-full"
				>
					Submit
				</Button>
				{loginMutation.isError && (
					<p className="text-red-600">{loginMutation.error.message}</p>
				)}
			</form>
		</Form>
	);
}
