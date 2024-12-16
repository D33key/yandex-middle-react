import { URLS } from './constants';

export const IMETHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
} as const;

export type Path = `/${string}` | '' | string;
export type Headers = { extends?: boolean; withToken?: boolean } & Record<
	string,
	string | boolean
>;

export type MethodKeys = (typeof IMETHOD)[keyof typeof IMETHOD];

export interface BaseAPIConfig {
	path?: Path;
	baseUrl?: (typeof URLS)[keyof typeof URLS];
}

export interface Options {
	method?: MethodKeys;
	headers?: Headers;
	withCredentials?: RequestCredentials;
	signal?: AbortSignal;
	data?: Record<string, unknown> | FormData;
}

export type APIMethod = (
	endpoint: Path | URL,
	options?: Options,
) => Promise<Response>;
