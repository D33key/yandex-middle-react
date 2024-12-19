import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../../api/authApi';
import convertFormDataToObject from '../../../utils/convertFormDataToObject';
import { AuthWithTokens } from '../../../api/types';

export const fetchAuthRegister = createAsyncThunk(
	'auth-register',
	async (formData: FormData, { signal, rejectWithValue }) => {
		try {
			const obj = convertFormDataToObject(formData);
			const response: AuthWithTokens = await authApi.register(obj, signal);

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
