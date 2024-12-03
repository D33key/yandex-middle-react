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

		return await response.json();
	}

	async order(data: { ingredients: string[] }, signal?: AbortSignal) {
		const response = await this.post(URLS.orders, {
			data,
			signal,
			withCredentials: 'same-origin',
		});

		return await response.json();
	}
}

const generalAPI = new GeneralApi();

export default generalAPI;
