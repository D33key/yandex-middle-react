import { createSlice } from '@reduxjs/toolkit';
import type { AuthWithTokens } from '../../api/types';
import { fetchAuthLogin } from './asyncThunk/login';

export const authSlice = createSlice({
	name: 'auth',
	initialState: null as AuthWithTokens | null,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthLogin.fulfilled, (_, action) => action.payload)
			.addCase(fetchAuthLogin.rejected, (_, action) => {
				console.error('Ошибка загрузки данных: ', action.error.message);
			});
	},
});

// export const {  } = ingredientsSlice.actions;

export default authSlice.reducer;
