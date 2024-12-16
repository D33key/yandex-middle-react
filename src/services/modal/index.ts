import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesType } from '../../components/burger-ingredients/types';
import { fetchOrder } from './asyncThunk';
import { OrderInfo } from './type';

export const modalInfo = createSlice({
	name: 'modalInfo',
	initialState: null as
		| CategoriesType
		| OrderInfo
		| { isLoading: boolean }
		| null,
	reducers: {
		openModal: (state, action: PayloadAction<CategoriesType>) => {
			state = action.payload;

			return state;
		},
		closeModal: (state) => ((state = null), state),
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrder.fulfilled, (_, action) => action.payload)
			.addCase(fetchOrder.pending, () => ({ isLoading: true }))
			.addCase(fetchOrder.rejected, (_, action) => {
				console.error('Ошибка загрузки данных: ', action.error.message);
			});
	},
});

export const { openModal, closeModal } = modalInfo.actions;

export default modalInfo.reducer;
