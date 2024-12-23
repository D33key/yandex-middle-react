import { createAsyncThunk } from '@reduxjs/toolkit';
import generalAPI from '../../api/generalApi';
import { CategoriesType } from '../../components/burger-ingredients/types';

export const fetchIngredients = createAsyncThunk(
	'ingredients',
	async (_, { signal, rejectWithValue }) => {
		try {
			const response = await generalAPI.getIngredients(signal);

			return response.data as CategoriesType[];
		} catch (error) {
			if ((error as Error).name === 'AbortError') {
				console.error('Запрос был отменен');
				return rejectWithValue('Запрос отменен');
			}
			return rejectWithValue(error);
		}
	},
);
