import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesType } from '../../types/burger-structure';
import { BurgerStructureState } from './types';

export const addIngredient: CaseReducer<
	BurgerStructureState[],
	PayloadAction<CategoriesType>
> = (state, action) => {
	const { type } = action.payload;
	const isBun = type === 'bun';
	const isBunAlreadyExist =
		state.findIndex((item) => item.type === 'bun') !== -1;

	if (isBun) {
		handleBun(state, action.payload, isBunAlreadyExist);
	} else {
		handleIngredient(state, action.payload, isBunAlreadyExist);
	}
};

function handleBun(
	state: BurgerStructureState[],
	payload: CategoriesType,
	isBunAlreadyExist: boolean,
) {
	const topBun = createBun(payload);
	const bottomBun = createBun(payload, 'bottom');

	if (isBunAlreadyExist) {
		state[0] = createBun(payload);
		state[state.length - 1] = createBun(payload, 'bottom');
	} else {
		state.unshift(topBun);
		state.push(bottomBun);
	}
}

function handleIngredient(
	state: BurgerStructureState[],
	payload: CategoriesType,
	isBunAlreadyExist: boolean,
) {
	if (!isBunAlreadyExist) {
		state.push(payload);
	} else {
		state.splice(state.length - 1, 0, payload);
	}
}

function createBun(
	obj: CategoriesType,
	align: 'top' | 'bottom' = 'top',
): BurgerStructureState {
	const bun = {
		...obj,
		isLocked: true,
		align,
	} as BurgerStructureState;

	if (align === 'bottom') {
		bun.id = bun.secondBunId;
	}

	delete bun.secondBunId;

	return bun;
}
