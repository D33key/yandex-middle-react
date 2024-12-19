export default function checkResponse(response: Response) {
	if (!response.ok) {
		return Promise.reject(response);
	}

	return response;
}
