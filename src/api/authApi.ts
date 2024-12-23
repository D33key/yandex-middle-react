import type { FormDataObject } from '../utils/convertFormDataToObject';
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

	checkUser = async (signal?: AbortSignal, token?: string) => {
		const isTokenAdded = token ?? false;
		const headers = isTokenAdded
			? ({
					Authorization: token,
			  } as Record<string, string>)
			: { withToken: true };

		const response = await this.get(URLS.user, {
			signal,
			headers,
			withCredentials: 'same-origin',
		});

		return await response.json();
	};

	updateUserInfo: AuthMethod = async (data, signal) => {
		const response = await this.patch(URLS.user, {
			data,
			signal,
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

	logout = async (token?: string, signal?: AbortSignal) => {
		const response = await this.post(URLS.logout, {
			data: { token },
			signal,
			withCredentials: 'same-origin',
		});

		return await response.json();
	};
}

export default new AuthApi();
