import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesType } from '../../components/burger-ingredients/types';
import { addIngredient as addIngredientCase } from './utils';
import { BurgerStructureState } from './types';

export const burgerStructure = createSlice({
	name: 'burgerStructure',
	initialState: [] as BurgerStructureState[],
	reducers: {
		addIngredient: addIngredientCase,
		removeIngredient: (state, action: PayloadAction<CategoriesType>) => {
			state.filter((ingredient) => ingredient !== action.payload);
		},
	},
});

export const { addIngredient, removeIngredient } = burgerStructure.actions;

export default burgerStructure.reducer;
