import BaseApi from './baseApi';
import { URLS } from './constants';

class GeneralApi extends BaseApi {
	constructor() {
		super();
	}

	async getIngredients(signal?: AbortSignal) {
		const response = await this.get(URLS.ingredients, {
			signal,
			withCredentials: 'same-origin',
		});

		if (!response.ok) {
			return Promise.reject(`Ошибка ${response.status}`);
		}

		return await response.json();
	}
}

const generalAPI = new GeneralApi();

export default generalAPI;