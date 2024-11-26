import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import burgerStructure from './burger-structure';

export const store = configureStore({
	reducer: {
		ingredients,
		burgerStructure,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
