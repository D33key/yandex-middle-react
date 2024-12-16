import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../../api/authApi';
import convertFormDataToObject from '../../../utils/convertFormDataToObject';
import { AuthWithTokens } from '../../../api/types';

export const fetchAuthLogin = createAsyncThunk(
	'auth',
	async (formData: FormData, { signal, rejectWithValue }) => {
		try {
			const obj = convertFormDataToObject(formData);
			const response = await authApi.login(obj, signal);

			return response.data as AuthWithTokens;
		} catch (error) {
			if ((error as Error).name === 'AbortError') {
				console.error('Запрос был отменен');
				return rejectWithValue('Запрос отменен');
			}
			return rejectWithValue(error);
		}
	},
);
