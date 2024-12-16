import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import burgerStructure from './burger-structure';
import modalInfo from './modal';

export const store = configureStore({
	reducer: {
		ingredients,
		burgerStructure,
		modalInfo,
	},
	devTools: import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
