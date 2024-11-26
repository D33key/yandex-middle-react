import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesType } from '../../components/burger-ingredients/types';

export const modalInfo = createSlice({
	name: 'modalInfo',
	initialState: null as CategoriesType | null,
	reducers: {
		openModal: (state, action: PayloadAction<CategoriesType>) => {
			state = action.payload;

			return state;
		},
		closeModal: (state) => ((state = null), state),
	},
});

export const { openModal, closeModal } = modalInfo.actions;

export default modalInfo.reducer;
