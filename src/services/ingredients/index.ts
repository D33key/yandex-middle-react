import { createSlice } from '@reduxjs/toolkit';
import { Categories } from '../../cells/burger-structure';
import { transformData } from '../../components/burger-ingredients/utils';
import { fetchIngredients } from './asyncThunk';

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: null as Categories | null,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.fulfilled, (_, action) => {
				const transformedData = transformData(action.payload);
				return transformedData;
			})
			.addCase(fetchIngredients.rejected, (_, action) => {
				console.error('Ошибка загрузки данных: ', action.error.message);
			});
	},
});

// export const {  } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
