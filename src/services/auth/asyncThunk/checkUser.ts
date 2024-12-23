import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../../api/authApi';
import isAborted from '../../../utils/isAborted';
import tryUpdateToken from '../../../utils/tryUpdateToken';

export const fetchAuthCheckUser = createAsyncThunk(
	'auth-check-user',
	async (
		{ token, signal }: { token: string; signal?: AbortSignal },
		{ rejectWithValue, fulfillWithValue },
	) => {
		try {
			const response = await authApi.checkUser(signal).catch(async (reason) => {
				await tryUpdateToken({
					reason,
					token,
					signal,
					rejectWithValue,
					fulfillWithValue,
				});
			});

			if (!response) {
				return rejectWithValue('Нет доступа');
			}

			return response;
		} catch (error) {
			if (isAborted(error)) {
				return rejectWithValue('Запрос отменен');
			}

			return rejectWithValue('Не валидный пользователь');
		}
	},
);
