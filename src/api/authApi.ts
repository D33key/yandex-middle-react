import type { FormDataObject } from '../utils/convertFormDataToObject';
import BaseApi from './baseApi';
import { URLS } from './constants';

class AuthApi extends BaseApi {
	constructor() {
		super({ path: '/auth' });
	}

	async login(data: FormDataObject, signal?: AbortSignal) {
		const response = await this.post(URLS.login, {
			data,
			signal,
			withCredentials: 'same-origin',
		});
		
		return await response.json();
	}
}

export default new AuthApi();
