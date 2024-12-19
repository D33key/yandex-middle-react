import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../../api/authApi';
import isAborted from '../../../utils/isAborted';

export const fetchAuthCheckUser = createAsyncThunk(
	'auth-check-user',
	async (
		{ token, signal }: { token: string; signal?: AbortSignal },
		{ rejectWithValue, fulfillWithValue },
	) => {
		try {
			const response = await authApi.checkUser(signal);

			return response;
		} catch (error) {
			if (isAborted(error)) {
				return rejectWithValue('Запрос отменен');
			}
			const errorResponse = await (error as Response).json();

			if (!errorResponse.success) {
				const responseToken = await authApi
					.updateToken(token, signal)
					.catch(() => null);

				if (!responseToken) {
					return rejectWithValue('Не валидный refresh token');
				}

				const responseUser = await authApi.checkUser(
					signal,
					responseToken.accessToken,
				);

				return fulfillWithValue({ ...responseUser, ...responseToken });
			}

			return rejectWithValue('Не валидный пользователь');
		}
	},
);
