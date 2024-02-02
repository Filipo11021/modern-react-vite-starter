import { z } from 'zod';

export const env = z
	.object({
		VITE_API_URL: z.string().url(),
		NODE_ENV: z.enum(['development', 'production']).default('development'),
	})
	.parse(import.meta.env);
