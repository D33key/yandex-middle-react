import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../../api/authApi';

export const fetchAuthLogout = createAsyncThunk(
	'auth-logout',
	async (_, { signal, rejectWithValue }) => {
		try {
			const response = await authApi.logout(signal);

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
