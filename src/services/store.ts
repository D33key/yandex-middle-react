import { configureStore, Middleware } from '@reduxjs/toolkit';
import authSlice from './auth';
import burgerStructure from './burger-structure';
import ingredients from './ingredients';
import modalInfo from './modal';
import { WEBSOCKET_ACTIONS } from '@/constansts/websocketActions';
import webSocketSlice from './websocket/slice';
import websocketMiddleware from './websocket/middleware';

export const store = configureStore({
	reducer: {
		ingredients,
		burgerStructure,
		modalInfo,
		authSlice,
		webSocketSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Возникает ошибка при onError как Non-Serializable Data
				// @ts-expect-error Непонятно, почему здесь ошибка
				ignoreActions: [WEBSOCKET_ACTIONS.onError],
				
			},
		}).concat(websocketMiddleware as Middleware),
	devTools: import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
