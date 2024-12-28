import setCookie from '@/helpers/utils/cookies/setCookie';
import { JWT_EXPIRED } from '../constansts/errorMessage';
import { URLS } from './constants';
import { APIMethod, IMETHOD, Options } from './types';
import checkResponse from './utils/checkResponse';
import { queryStringify } from './utils/queryStringify';
import getCookie from '@/helpers/utils/cookies/getCookie';
import convertErrorResponse from '@/helpers/utils/convertErrorResponse';

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
			withCredentials: 'same-origin',
		});

		const { accessToken, refreshToken } = await response.json();

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
				try {
					const newToken = await this.refreshToken().catch((_) => {
						throw new Error('Не удалось обновить токен');
					});
					return await executeRequest(newToken).catch((_) => {
						throw new Error('Нет доступа');
					});
				} catch (error) {
					throw new Error((error as Error).message);
				}
			}

			throw new Error(errorResponse);
		}
	};
}
