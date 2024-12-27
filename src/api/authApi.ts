import type { FormDataObject } from '../utils/convertFormDataToObject';
import getCookie from '../utils/cookies/getCookie';
import BaseApi from './baseApi';
import { URLS } from './constants';

export type AuthMethod = <T extends object = object>(
	data: FormDataObject,
	signal?: AbortSignal,
) => Promise<T>;

class AuthApi extends BaseApi {
	constructor() {
		super({ path: '/auth' });
	}

	login: AuthMethod = async (data, signal) => {
		const response = await this.post(URLS.login, {
			data,
			signal,
			withCredentials: 'same-origin',
		});

		return await response.json();
	};

	register: AuthMethod = async (data, signal) => {
		const response = await this.post(URLS.register, {
			data,
			signal,
			withCredentials: 'same-origin',
		});

		return await response.json();
	};

	checkUser = async (signal?: AbortSignal) => {
		const response = await this.get(URLS.user, {
			signal,
			headers: { withToken: true },
			shouldRevalidateIfTokenExpired: true,
			withCredentials: 'same-origin',
		});

		return await response.json();
	};

	updateUserInfo: AuthMethod = async (data, signal) => {
		const response = await this.patch(URLS.user, {
			data,
			signal,
			headers: {
				'withToken': true,
				'Content-Type': 'application/json;charset=utf-8',
			},
			shouldRevalidateIfTokenExpired: true,
			withCredentials: 'same-origin',
		});

		return await response.json();
	};

	updateToken = async (token: string, signal?: AbortSignal) => {
		const response = await this.post(URLS.refreshToken, {
			data: {
				token,
			},
			signal,
			withCredentials: 'same-origin',
		});

		return await response.json();
	};

	forgotPassword: AuthMethod = async (data, signal) => {
		const response = await this.post(URLS.forgotPassword, {
			data,
			signal,
			withCredentials: 'same-origin',
		});

		return await response.json();
	};

	resetPassword: AuthMethod = async (data, signal) => {
		const response = await this.post(URLS.resetPassword, {
			data,
			signal,
			withCredentials: 'same-origin',
		});

		return await response.json();
	};

	logout = async (signal?: AbortSignal) => {
		const token = getCookie('refreshToken');

		const response = await this.post(URLS.logout, {
			signal,
			data: { token },
			withCredentials: 'same-origin',
		});

		return await response.json();
	};
}

export default new AuthApi();
