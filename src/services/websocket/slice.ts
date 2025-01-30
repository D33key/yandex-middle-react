import { WEBSOCKET_ACTIONS } from '@/constansts/websocketActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WebSocketOrder {
	createdAt: string;
	name: string;
	number: string;
	status: 'done' | 'in progress';
	updatedAt: string;
	_id: string;
	ingredients: string[];
	price?: number;
}

export interface WebSocketData {
	success: boolean;
	total: number;
	totalToday: number;
	orders: WebSocketOrder[];
}

interface WebSocketState {
	data: WebSocketData | null;
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
			})
			.addCase(
				WEBSOCKET_ACTIONS.onMessageReceived,
				(state, action: PayloadAction<WebSocketData>) => {
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
