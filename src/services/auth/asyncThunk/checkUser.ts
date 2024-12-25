import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../../api/authApi';
import isAborted from '../../../utils/isAborted';

export const fetchAuthCheckUser = createAsyncThunk(
	'auth-check-user',
	async (_, { rejectWithValue, signal }) => {
		try {
			const response = await authApi.checkUser(signal);

			if (!response) {
				return rejectWithValue('Нет доступа');
			}

			return response;
		} catch (error) {
			if (isAborted(error)) {
				return rejectWithValue('Запрос отменен');
			}
		
			return rejectWithValue((error as Error).message);
		}
	},
);
