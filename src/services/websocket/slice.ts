import { WEBSOCKET_ACTIONS } from '@/constansts/websocketActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedInfo } from '../modal/type';

export interface WebSocketOrder<T = string[]> {
	createdAt: string;
	name: string;
	number: string;
	status: 'done' | 'in progress';
	updatedAt: string;
	_id: string;
	ingredients: T;
	price?: number;
}

export interface WebSocketData<T = string[]> {
	success: boolean;
	total: number;
	totalToday: number;
	orders: WebSocketOrder<T>[];
}

interface WebSocketState {
	data: WebSocketData<FeedInfo['ingredients']> | null;
	connected: boolean;
	error: string | null;
}

const initialState: WebSocketState = {
	data: null,
	connected: false,
	error: null,
};

const webSocketSlice = createSlice({
	name: 'webSocketSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(WEBSOCKET_ACTIONS.onConnected, (state) => {
				state.connected = true;
				state.error = null;
			})
			.addCase(WEBSOCKET_ACTIONS.onDisconnected, (state) => {
				state.connected = false;
				state.data = null;
			})
			.addCase(
				WEBSOCKET_ACTIONS.onMessageReceived,
				(state, action: PayloadAction<WebSocketState['data']>) => {
					state.data = action.payload;
				},
			)
			.addCase(
				WEBSOCKET_ACTIONS.onError,
				(state, action: PayloadAction<string>) => {
					state.error = action.payload;
				},
			);
	},
});

export default webSocketSlice.reducer;
