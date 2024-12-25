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

export const fetchIngredient = createAsyncThunk(
	'ingredient',
	async (id: string, { signal, rejectWithValue }) => {
		try {
			const { data } = await generalAPI.getIngredients(signal);
			const ingredient = (data as CategoriesType[]).find(
				(item) => item._id === id,
			);

			return ingredient;
		} catch (error) {
			if ((error as Error).name === 'AbortError') {
				console.error('Запрос был отменен');
				return rejectWithValue('Запрос отменен');
			}
			return rejectWithValue(error);
		}
	},
);
