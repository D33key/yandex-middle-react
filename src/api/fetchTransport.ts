import { APIMethod, IMETHOD, Options } from './types';
import checkResponse from './utils/checkResponse';
import { queryStringify } from './utils/queryStringify';

export default class FetchTransport {
	private corePath: string;

	constructor(baseUrl = 'https://norma.nomoreparties.space/api', path = '') {
		this.corePath = baseUrl + path;
	}

	get: APIMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: IMETHOD.GET });
	};

	post: APIMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: IMETHOD.POST });
	};

	put: APIMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: IMETHOD.PUT });
	};

	patch: APIMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: IMETHOD.PATCH });
	};

	delete: APIMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: IMETHOD.DELETE });
	};

	private request: APIMethod = async (
		url,
		options = { method: IMETHOD.GET },
	) => {
		const {
			method,
			data = {},
			headers = {},
			withCredentials: credentials = 'include',
			signal,
		} = options as Options & { headers: Record<string, string> };

		if (method === 'GET') {
			const correctedUrl = new URL(
				this.corePath + url + queryStringify(data as Record<string, string>),
			);

			const response = await fetch(correctedUrl.href, {
				method,
				headers,
				credentials,
				signal,
			});

			return checkResponse(response);
		}

		const body = data instanceof FormData ? data : JSON.stringify(data);

		const response = await fetch(this.corePath + url, {
			method,
			headers,
			body,
			credentials,
			signal,
		});

		return checkResponse(response);
	};
}
