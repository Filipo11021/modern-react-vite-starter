import merge from 'lodash.merge';
import type { ZodType, ZodTypeDef } from 'zod';

export type FetcherOptionsWithValidation<
	SuccessInput,
	SuccessOutput,
	ErrorInput,
	ErrorOutput extends string,
> = Readonly<{
	options?: RequestInit;
	successSchema: ZodType<SuccessOutput, ZodTypeDef, SuccessInput>;
	errorSchema: ZodType<ErrorOutput, ZodTypeDef, ErrorInput>;
	skipValidation?: false | undefined;
}>;

export type FetcherOptionsWithoutValidation = Readonly<{
	options?: RequestInit;
	skipValidation: true;
}>;

export type FetcherOptions<
	SuccessInput,
	SuccessOutput,
	ErrorInput,
	ErrorOutput extends string,
> =
	| FetcherOptionsWithValidation<
			SuccessInput,
			SuccessOutput,
			ErrorInput,
			ErrorOutput
	  >
	| FetcherOptionsWithoutValidation;

export type FetcherUrl = string | URL;

export function createFetcher(defaultFetcherConfig?: {
	options?: RequestInit | (() => RequestInit);
	baseUrl: FetcherUrl | (() => FetcherUrl);
}) {
	async function fetcher<
		SuccessInput,
		SuccessOutput,
		ErrorInput,
		ErrorOutput extends string,
	>(
		url: string | URL,
		fetcherOptions: FetcherOptionsWithValidation<
			SuccessInput,
			SuccessOutput,
			ErrorInput,
			ErrorOutput
		>
	): Promise<SuccessOutput>;

	async function fetcher(
		url: FetcherUrl,
		fetcherOptions: FetcherOptionsWithoutValidation
	): Promise<unknown>;

	async function fetcher<
		SuccessInput,
		SuccessOutput,
		ErrorInput,
		ErrorOutput extends string,
	>(
		url: FetcherUrl,
		fetcherOptions: FetcherOptions<
			SuccessInput,
			SuccessOutput,
			ErrorInput,
			ErrorOutput
		>
	): Promise<SuccessOutput | unknown> {
		const fetcherOptionsWithDefaults = defaultFetcherConfig?.options
			? merge(
					{},
					(() => {
						const options = defaultFetcherConfig?.options;
						if (options instanceof Function) return options();
						return options;
					})(),
					fetcherOptions.options
			  )
			: fetcherOptions.options;

		const baseUrl = (() => {
			const url = defaultFetcherConfig?.baseUrl;
			if (url instanceof Function) return url();
			return url;
		})();

		function fetchUrlToString(fetchUrl: string | URL): string;
		function fetchUrlToString(fetchUrl: undefined): undefined;
		function fetchUrlToString(
			fetchUrl: string | URL | undefined
		): string | undefined;
		function fetchUrlToString(
			fetchUrl: string | URL | undefined
		): string | undefined {
			if (!fetchUrl) return undefined;
			if (fetchUrl instanceof URL) return fetchUrl.href;
			return fetchUrl;
		}

		const fetcherUrl = (() => {
			baseUrl;
			const urlAsString = fetchUrlToString(baseUrl);
			if (!urlAsString) return url;
			const normalizedUrl = fetchUrlToString(url).replace(/\//, '');
			const normalizedBaseUrl = urlAsString.replace(/\/$/, '');

			return `${normalizedBaseUrl}/${normalizedUrl}`;
		})();
		const response = await fetch(fetcherUrl, fetcherOptionsWithDefaults);
		const data: unknown = await response.json();

		if (!response.ok) {
			if (fetcherOptions.skipValidation) {
				throw Error('unknown error');
			}

			const parsedErrorData = fetcherOptions.errorSchema.parse(data);
			throw Error(parsedErrorData);
		}

		if (fetcherOptions.skipValidation) {
			return data;
		}

		const parsedSuccessData = fetcherOptions.successSchema.parse(data);

		return parsedSuccessData;
	}

	return fetcher;
}
