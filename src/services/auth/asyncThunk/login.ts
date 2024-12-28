import authApi from '@/api/authApi';
import type { AuthWithTokens } from '@/api/types';
import convertFormDataToObject from '@/helpers/utils/convertFormDataToObject';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAuthLogin = createAsyncThunk(
	'auth-login',
	async (formData: FormData, { signal, rejectWithValue }) => {
		try {
			const obj = convertFormDataToObject(formData);
			const response: AuthWithTokens = await authApi.login(obj, signal);

			delete response.success;

			return response;
		} catch (error) {
			if (
				error &&
				typeof error === 'object' &&
				'name' in error &&
				error.name === 'AbortError'
			) {
				console.error('Запрос был отменен');
				return rejectWithValue('Запрос отменен');
			}
			const errorResponse = await (error as Response).json();

			return rejectWithValue(errorResponse.message);
		}
	},
);
