export default async function convertErrorResponse(error: unknown) {
	if (error) {
		if (typeof error === 'object') {
			if ('body' in error) return (await (error as Response).json())?.message;
			if ('message' in error) return error.message;
		} else {
			return error;
		}
	} else {
		throw new Error('Не удалось конвертировать ошибку');
	}
}
