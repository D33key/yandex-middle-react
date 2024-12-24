import { JWT_EXPIRED } from '../constansts/errorMessage';
import convertErrorResponse from '../utils/convertErrorResponse';
import getCookie from '../utils/cookies/getCookie';
import setCookie from '../utils/cookies/setCookie';
import { URLS } from './constants';
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

	private async refreshToken() {
		const response = await this.post(URLS.refreshToken, {
			data: { token: this.getToken('refreshToken') },
		});

		const { accessToken, refreshToken, success } = await response.json();

		if (!success) {
			throw new Error('Не удалось обновить токен');
		}

		setCookie('accessToken', accessToken, 1);
		setCookie('refreshToken', refreshToken, 2);

		return accessToken as string;
	}

	getToken(type: 'accessToken' | 'refreshToken' = 'accessToken') {
		return getCookie(type) ?? '';
	}

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
			shouldRevalidateIfTokenExpired = false,
		} = options as Options & { headers: Record<string, string> };

		const executeRequest = async (token?: string) => {
			if (token) {
				headers.authorization = token;
			}

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

		try {
			return await executeRequest();
		} catch (error) {
			const errorResponse = await convertErrorResponse(error);
			if (shouldRevalidateIfTokenExpired && errorResponse === JWT_EXPIRED) {
				const newToken = await this.refreshToken();
				return await executeRequest(newToken).catch((_) => {
					throw new Error('Нет доступа');
				});
			}

			throw new Error(errorResponse);
		}
	};
}
