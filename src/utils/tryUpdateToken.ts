import authApi from '../api/authApi';

export default async function tryUpdateToken<RejectReturn>({
	reason,
	token,
	signal,
	rejectWithValue,
	fulfillWithValue,
}: {
	reason: Response | string;
	token: string;
	signal?: AbortSignal;
	rejectWithValue: (value: unknown) => RejectReturn;
	fulfillWithValue: <T>(value: T) => T;
}) {
	if (
		typeof reason === 'object' &&
		'status' in reason &&
		reason.status === 403
	) {
		const responseToken = await authApi
			.updateToken(token, signal)
			.catch(() => null);

		if (!responseToken) {
			return rejectWithValue('Не валидный refresh token');
		}

		const responseUser = await authApi
			.checkUser(signal, responseToken.accessToken)
			.catch(() => null);

		if (!responseUser) {
			return rejectWithValue('Не удалось приминить новый токен');
		}

		return fulfillWithValue({ ...responseUser, ...responseToken });
	} else {
		throw new Error('Неизвестная ошибка');
	}
}
