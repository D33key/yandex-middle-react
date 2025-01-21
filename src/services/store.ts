import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import burgerStructure from './burger-structure';
import modalInfo from './modal';
import authSlice from './auth';

export const store = configureStore({
	reducer: {
		ingredients,
		burgerStructure,
		modalInfo,
		authSlice,
	},
	devTools: import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
