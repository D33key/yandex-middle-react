import { createAsyncThunk } from '@reduxjs/toolkit';
import generalAPI from '../../api/generalApi';
import { BurgerStructureState } from '../burger-structure/types';

export const fetchOrder = createAsyncThunk(
	'modalInfo',
	async (ingredients: BurgerStructureState[], { signal, rejectWithValue }) => {
		try {
			const arrayOfIds = ingredients.map((item) => item._id);
			const response = await generalAPI.order(
				{ ingredients: arrayOfIds },
				signal,
			);

			return response;
		} catch (error) {
			if ((error as Error).name === 'AbortError') {
				console.error('Запрос был отменен');
				return rejectWithValue('Запрос отменен');
			}
			return rejectWithValue(error);
		}
	},
);
