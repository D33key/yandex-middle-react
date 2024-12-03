export default async function checkResponse(response: Response) {
	if (!response.ok) {
		return Promise.reject(`Ошибка ${response.status}`);
	}

	return await response.json();
}
