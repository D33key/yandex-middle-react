import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesType } from '../../components/burger-ingredients/types';
import { BurgerStructureState } from './types';

export const addIngredient: CaseReducer<
	BurgerStructureState[],
	PayloadAction<CategoriesType>
> = (state, action) => {
	const isBun = action.payload.type === 'bun';

	if (isBun) {
		const firstBun = createBun(action.payload);
		state.unshift(firstBun);

		const secondBun = createBun(action.payload, 'bottom');
		state.push(secondBun);
	} else {
		state.push(action.payload);
	}
};

function createBun(
	obj: CategoriesType,
	align: 'top' | 'bottom' = 'top',
): BurgerStructureState {
	return {
		...obj,
		isLocked: true,
		align,
	};
}
