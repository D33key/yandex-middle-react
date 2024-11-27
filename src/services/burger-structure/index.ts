import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesType } from '../../components/burger-ingredients/types';
import { addIngredient as addIngredientCase } from './utils';
import { BurgerStructureState } from './types';

export const burgerStructure = createSlice({
	name: 'burgerStructure',
	initialState: [] as BurgerStructureState[],
	reducers: {
		addIngredient: addIngredientCase,
		removeIngredient: (state, action: PayloadAction<CategoriesType['_id']>) => {
			const index = state.findIndex(
				(ingredient) => ingredient._id === action.payload,
			);

			if (index !== -1) {
				state.splice(index, 1);
			}
		},
	},
});

export const { addIngredient, removeIngredient } = burgerStructure.actions;

export default burgerStructure.reducer;
