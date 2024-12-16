import { createAsyncThunk } from '@reduxjs/toolkit';
import generalAPI from '../../api/generalApi';

export const fetchIngredients = createAsyncThunk(
	'ingredients',
	async (_, { signal, rejectWithValue }) => {
		try {
			const response = await generalAPI.getIngredients(signal);

			return response.data;
		} catch (error) {
			if ((error as Error).name === 'AbortError') {
				console.error('Запрос был отменен');
				return rejectWithValue('Запрос отменен');
			}
			return rejectWithValue(error);
		}
	},
);
