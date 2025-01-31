import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesType } from '../../types/burger-structure';
import { fetchOrder } from './asyncThunk';
import type { FeedInfo, OrderInfo } from './type';

export const modalInfo = createSlice({
	name: 'modalInfo',
	initialState: null as
		| CategoriesType
		| OrderInfo
		| FeedInfo
		| { isLoading: boolean }
		| null,
	reducers: {
		openModal: (state, action: PayloadAction<CategoriesType | FeedInfo>) => {
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
