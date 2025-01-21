import { AuthMethod } from './authApi';
import BaseApi from './baseApi';
import { URLS } from './constants';

class PasswordApi extends BaseApi {
	constructor() {
		super();
	}

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
}

export default new PasswordApi();
