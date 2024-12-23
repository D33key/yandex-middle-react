import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../../api/authApi';
import isAborted from '../../../utils/isAborted';
import tryUpdateToken from '../../../utils/tryUpdateToken';
import { FormDataObject } from '../../../utils/convertFormDataToObject';

export const fetchAuthUpdateUser = createAsyncThunk(
	'auth-update-user',
	async (
		{
			data,
			token,
			signal,
		}: { data: FormDataObject; token: string; signal?: AbortSignal },
		{ rejectWithValue, fulfillWithValue },
	) => {
		try {
			const response = await authApi
				.updateUserInfo(data, signal)
				.catch(async (reason) => {
					const updatedTokens = await tryUpdateToken({
						reason,
						token,
						signal,
						rejectWithValue,
						fulfillWithValue,
					});
					console.log('@', updatedTokens);
					const responseWithNewToken = await authApi
						.updateUserInfo(data, signal)
						.catch((res) => {
							throw new Error(res);
						});

					return {
						accessToken: updatedTokens.accessToken,
						refreshToken: updatedTokens.refreshToken,
						...responseWithNewToken,
					};
				});

			return response;
		} catch (error) {
			if (isAborted(error)) {
				return rejectWithValue('Запрос отменен');
			}

			return rejectWithValue('Не валидный пользователь');
		}
	},
);
